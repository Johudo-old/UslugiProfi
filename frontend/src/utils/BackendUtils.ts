import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";

export const BackendUtils = {
    isRequestMethodAllowed,
    setRequestMethodNotAllowed,
    setIternalServerError,
};

function isRequestMethodAllowed(
    req: NextApiRequest,
    res: NextApiResponse,
    allowedRequestMethods: Array<string>
): boolean {
    for (let index in allowedRequestMethods) {
        if (req.method === allowedRequestMethods[index]) return true;
    }

    return false;
}

function setRequestMethodNotAllowed(req: NextApiRequest, res: NextApiResponse, allowedRequestMethods: Array<string>) {
    res.setHeader("Allow", allowedRequestMethods);
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        error: `Method ${req.method} not allowed`,
    });
}

function setIternalServerError(req: NextApiRequest, res: NextApiResponse) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Something went wrong when retrieving user",
    });
}
