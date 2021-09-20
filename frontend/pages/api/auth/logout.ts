import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../config";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const refresh = cookies.refresh || "";

        console.log("LOGOUT_COOKIES", cookies);

        if (!refresh) {
            return res.status(401).json({
                error: "User unauthorized to make this request",
            });
        }

        const body = {
            refresh,
        };

        try {
            const apiRes = await axios
                .post(BACKEND_API_URL + "/auth/logout/", body)
                .then((res: AxiosResponse<{}>) => res)
                .catch((err: AxiosError) => err.response as AxiosResponse);

            if (apiRes.status === 200) {
                res.setHeader("Set-Cookie", [
                    cookie.serialize("access", "", {
                        httpOnly: false,
                        expires: new Date(0),
                        sameSite: false,
                        path: "/",
                    }),
                    cookie.serialize("refresh", "", {
                        httpOnly: false,
                        expires: new Date(0),
                        sameSite: false,
                        path: "/",
                    }),
                ]);

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
        return res.status(405).json({
            error: `Method ${req.method} now allowed`,
        });
    }
}
