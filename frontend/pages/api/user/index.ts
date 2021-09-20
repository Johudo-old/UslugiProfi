import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../config";
import { UserInfoAPIData } from "../../../src/api/UserAPI";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const access = cookies.access ?? "";

        if (!access) {
            return res.status(401).json({
                error: "User unauthorized to make this request",
            });
        }

        try {
            const apiRes = await axios
                .get(BACKEND_API_URL + "/api/user/")
                .then((res: AxiosResponse<UserInfoAPIData>) => res)
                .catch((err: AxiosError) => err.response as AxiosResponse);

            if (apiRes.status === 200) {
                return res.status(200).json(apiRes.data);
            } else {
                return res.status(apiRes.status).json({
                    error: apiRes.data.error,
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: "Something went wrong when retrieving user",
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`,
        });
    }
}
