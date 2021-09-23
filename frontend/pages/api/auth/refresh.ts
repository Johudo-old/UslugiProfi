import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL, JWT_AUTH_HEADER_PREFIX } from "../../../config";
import { AuthLoginAPIData } from "../../../src/api/AuthAPI";
import { BackendUtils } from "../../../src/utils/BackendUtils";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const allowedRequestMethods: Array<string> = ["GET"];

    if (!BackendUtils.isRequestMethodAllowed(req, res, allowedRequestMethods)) {
        return BackendUtils.setRequestMethodNotAllowed(req, res, allowedRequestMethods);
    }

    const cookies = cookie.parse(req.headers.cookie ?? "");
    const refresh = cookies.refresh || "";

    if (!refresh) {
        return res.status(401).json({
            error: "User unauthorized to make this request",
        });
    }

    try {
        const apiRes = await axios
            .post(BACKEND_API_URL + "/auth/token/refresh/", { refresh })
            .then((res: AxiosResponse<{}>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiRes.status === 200) {
            res.setHeader("Set-Cookie", [
                BackendUtils.serializeAccessCookie((apiRes.data as AuthLoginAPIData).access),
                BackendUtils.serializeRefreshCookie((apiRes.data as AuthLoginAPIData).refresh),
            ]);
            axios.defaults.headers.common["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${
                (apiRes.data as AuthLoginAPIData).access
            }`;

            return res.status(200).json({});
        }

        if (apiRes.status === 401) {
            res.setHeader("Set-Cookie", "");
            axios.defaults.headers.common["Authorization"] = undefined;
            return res.status(401).json(apiRes.data);
        }

        return res.status(apiRes.status).json({
            error: apiRes.data.error,
        });
    } catch (error) {
        console.log(error);
        return BackendUtils.setIternalServerError(req, res);
    }
}
