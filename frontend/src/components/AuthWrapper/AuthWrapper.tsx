import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JWT_AUTH_HEADER_PREFIX } from "../../../config";
import { AuthAPI, AuthRefreshTokenAPIData } from "../../api/AuthAPI";
import { UserAPI, UserInfoAPIData } from "../../api/UserAPI";
import { TokensService } from "../../services/TokensService";
import { UserActionCreator } from "../../store/actionCreators/UserActionCreator";
import { AuthWrapperProps } from "./AuthWrapperProps";

export default function AuthWrapper(props: AuthWrapperProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshToken = TokensService.getRefreshToken();
        if (refreshToken) authUser(refreshToken);
    }, []);

    async function authUser(refreshToken: string) {
        console.log("AUTH_USER");
        if (!(await getAccessTokenAndWriteInAxiosHeader(refreshToken))) return;
        const userInfo = await getUserInfo();
        console.log(userInfo);
        dispatch(UserActionCreator.setUserInfo(userInfo as UserInfoAPIData));
    }

    async function getAccessTokenAndWriteInAxiosHeader(refreshToken: string): Promise<boolean> {
        const result = await AuthAPI.refreshToken({ refresh: refreshToken });

        if (result.status !== 200) {
            console.log(result);
            return false;
        }

        const accessToken = (result.data as AuthRefreshTokenAPIData).access;
        axios.defaults.headers.common["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${accessToken}`;
        return true;
    }

    async function getUserInfo() {
        const result = await UserAPI.getCurrenUserInfo();

        if (result.status !== 200) {
            console.log(result);
            return undefined;
        }

        return result.data as UserInfoAPIData;
    }

    return <>{props.children}</>;
}
