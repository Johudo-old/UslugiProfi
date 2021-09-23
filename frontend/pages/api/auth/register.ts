import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../config";
import { AuthLoginAPIData } from "../../../src/api/AuthAPI";
import { BackendUtils } from "../../../src/utils/BackendUtils";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const allowedRequestMethods: Array<string> = ["POST"];

    if (!BackendUtils.isRequestMethodAllowed(req, res, allowedRequestMethods)) {
        return BackendUtils.setRequestMethodNotAllowed(req, res, allowedRequestMethods);
    }

    try {
        const apiRes = await axios
            .post(BACKEND_API_URL + "/auth/register/", req.body)
            .then((res: AxiosResponse<AuthLoginAPIData>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiRes.status === 200) {
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
