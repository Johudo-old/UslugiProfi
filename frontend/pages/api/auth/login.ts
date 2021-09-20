import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../config";
import { AuthLoginAPIData } from "../../../src/api/AuthAPI";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const apiRes = await axios
                .post(BACKEND_API_URL + "/auth/login/", req.body)
                .then((res: AxiosResponse<AuthLoginAPIData>) => res)
                .catch((err: AxiosError) => err.response as AxiosResponse);

            if (apiRes.status === 200) {
                res.setHeader("Set-Cookie", [
                    cookie.serialize("access", apiRes.data.access, {
                        // httpOnly: true,
                        // secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 30,
                        // sameSite: "strict",
                        // path: "/api/",
                        path: "/",
                    }),
                    cookie.serialize("refresh", apiRes.data.refresh, {
                        // httpOnly: true,
                        // secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60 * 24 * 30,
                        // sameSite: "strict",
                        // path: "/api/",
                        path: "/",
                    }),
                ]);

                return res.status(200).json({
                    success: "Logged in successfully",
                });
            } else {
                return res.status(apiRes.status).json({
                    error: "Authentication failed",
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: "Something went wrong when authenticating",
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    }
}
