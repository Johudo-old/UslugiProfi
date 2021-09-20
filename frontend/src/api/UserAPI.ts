import axios, { AxiosError, AxiosResponse } from "axios";
import { FRONTEND_API_URL } from "../../config";
import { User } from "../types/User";

export const UserAPI = {
    getCurrenUserInfo: getCurrenUserInfo,
};

function getCurrenUserInfo() {
    return axios
        .get(FRONTEND_API_URL + "/api/user/")
        .then((res: AxiosResponse<UserInfoAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface UserInfoAPIData extends User {}
