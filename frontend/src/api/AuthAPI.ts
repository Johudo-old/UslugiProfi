import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../config";

export const AuthAPI = {
    login: loginQuery,
    logout: logoutQuery,
    register: registerQuery,
    refreshToken: refreshTokenQuery,
};

export interface AuthLoginAPIData extends APIDataWithAccessToken, APIDataWithRefreshToken {}
export interface AuthRefreshTokenAPIData extends APIDataWithAccessToken {}

interface APIDataWithAccessToken {
    access: string;
}

interface APIDataWithRefreshToken {
    refresh: string;
}

function loginQuery(data: { email: string; password: string }) {
    return axios
        .post(API_URL + "/auth/login/", data)
        .then((res: AxiosResponse<AuthLoginAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function logoutQuery(data: { refresh: string }) {
    return axios
        .post(API_URL + "/auth/logout/", data)
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function registerQuery(data: { email: string; password: string }) {
    return axios
        .post(API_URL + "/auth/register/", data)
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function refreshTokenQuery(data: { refresh: string }) {
    return axios
        .post(API_URL + "/auth/token/refresh/", data)
        .then((res: AxiosResponse<AuthRefreshTokenAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}
