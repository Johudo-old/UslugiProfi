import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL, JWT_AUTH_HEADER_PREFIX } from "../../../config";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
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
                    cookie.serialize("access", apiRes.data.access, {
                        // httpOnly: true,
                        // secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 30,
                        // sameSite: "strict",
                        path: "/",
                    }),
                    cookie.serialize("refresh", apiRes.data.refresh, {
                        // httpOnly: true,
                        // secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60 * 24 * 30,
                        // sameSite: "strict",
                        path: "/",
                    }),
                ]);

                axios.defaults.headers.common["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${apiRes.data.access}`;

                return res.status(200).json({
                    success: "Refresh request successful",
                });
            } else {
                return res.status(apiRes.status).json({
                    error: "Failed to fulfill refresh request",
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: "Something went wrong when trying to fulfill refresh request",
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}
