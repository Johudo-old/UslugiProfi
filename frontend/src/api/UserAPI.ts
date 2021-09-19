import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../config";
import { User } from "../types/User";

export const UserAPI = {
    getCurrenUserInfo: getCurrenUserInfo,
};

function getCurrenUserInfo() {
    return axios
        .get(API_URL + "/api/user/")
        .then((res: AxiosResponse<UserInfoAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface UserInfoAPIData extends User {}
