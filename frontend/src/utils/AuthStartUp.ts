import axios, { AxiosError, AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { BACKEND_API_URL, JWT_AUTH_HEADER_PREFIX } from "../../config";
import cookie from "cookie";
import { AnyAction, Store } from "redux";
import { IState } from "../store";
import { UserInfoAPIData } from "../api/UserAPI";
import { ThunkDispatch } from "redux-thunk";
import { UserActionsEnum } from "../store/actions/UserActions";
import Cookies from "js-cookie";

export const AuthStartUp = async (store: Store<IState, AnyAction>, { pathname, req, res }: NextPageContext) => {
    try {
        const cookies = cookie.parse(req?.headers?.cookie ?? "");
        const refresh = cookies.refresh || "";

        if (!refresh) {
            throw Error;
        }

        const apiResRefresh = await axios
            .post(BACKEND_API_URL + "/auth/token/refresh/", {
                refresh,
            })
            .then((res: AxiosResponse<{}>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiResRefresh.status !== 200) {
            throw Error;
        }

        res?.setHeader("Set-Cookie", [
            cookie.serialize("access", apiResRefresh.data.access, {
                maxAge: 60 * 30,
                // httpOnly: false,
                expires: new Date(0),
                sameSite: false,
                path: "/",
            }),
            cookie.serialize("refresh", apiResRefresh.data.refresh, {
                maxAge: 60 * 60 * 24,
                // httpOnly: false,
                expires: new Date(0),
                sameSite: false,
                path: "/",
            }),
        ]);

        axios.defaults.headers.common["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${apiResRefresh.data.access}`;

        const apiResUserInfo = await axios
            .get(BACKEND_API_URL + "/api/user/")
            .then((res: AxiosResponse<UserInfoAPIData>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiResUserInfo.status !== 200) {
            throw Error;
        }

        (store.dispatch as ThunkDispatch<IState, {}, any>)({
            type: UserActionsEnum.LOAD_USER_SUCCESS,
            payload: {
                user: apiResUserInfo.data,
            },
        });
    } catch (err) {}
};
