import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { Dimension } from "../types/Dimension";
import { APIUtils } from "../utils/APIUtils";

export const DimensionAPI = {
    getDimensions,
};

function getDimensions() {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/django-api/dimension/", { headers: defaultHeaders })
        .then((res: AxiosResponse<DimensionAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface DimensionAPIData extends Array<Dimension> {}
