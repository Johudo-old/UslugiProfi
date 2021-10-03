import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { Announcement } from "../types/Announcement";
import { APIUtils } from "../utils/APIUtils";

export const AnnouncementAPI = {
    getAnnouncements,
    createAnnouncements,
    getAnnouncementById,
};

function getAnnouncements(config: { user?: number } = {}) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/django-api/announcement/", {
            params: {
                user: config.user,
            },
            headers: defaultHeaders,
        })
        .then((res: AxiosResponse<getAnnouncementsAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function createAnnouncements(data: FormData) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .post(BACKEND_API_URL + "/django-api/announcement/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...defaultHeaders,
            },
        })
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function getAnnouncementById(id: number) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(`${BACKEND_API_URL}/django-api/announcement/${id}/`, {
            headers: defaultHeaders,
        })
        .then((res: AxiosResponse<getAnnouncementByIdAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface getAnnouncementsAPIData extends Array<Announcement> {}
export interface getAnnouncementByIdAPIData extends Announcement {}
