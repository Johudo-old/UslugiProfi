import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { User } from "../types/User";
import { APIUtils } from "../utils/APIUtils";

export const UserAPI = {
    getCurrenUserInfo,
    updateCurrenUserInfo,
};

function getCurrenUserInfo() {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/api/user/me", { headers: defaultHeaders })
        .then((res: AxiosResponse<UserInfoAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function updateCurrenUserInfo(data: FormData) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .patch(BACKEND_API_URL + "/api/user/me/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<UserInfoAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface UserInfoAPIData extends User {}
