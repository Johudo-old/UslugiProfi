import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../config";
import { AnnouncementAPIData } from "../../../src/api/AnnouncementAPI";
import { BackendUtils } from "../../../src/utils/BackendUtils";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const allowedRequestMethods: Array<string> = ["GET"];

    if (!BackendUtils.isRequestMethodAllowed(req, res, allowedRequestMethods)) {
        console.log(req.method);

        return BackendUtils.setRequestMethodNotAllowed(req, res, allowedRequestMethods);
    }

    try {
        const apiRes = await axios
            .get(BACKEND_API_URL + "/api/announcement/", { params: req.query })
            .then((res: AxiosResponse<AnnouncementAPIData>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiRes.status === 200) {
            return res.status(200).json(apiRes.data);
        }

        return res.status(apiRes.status).json({
            error: apiRes.data.error,
        });
    } catch (error) {
        return BackendUtils.setIternalServerError(req, res);
    }
}
