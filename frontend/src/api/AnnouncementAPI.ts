import axios, { AxiosError, AxiosResponse } from "axios";
import { FRONTEND_API_URL } from "../../config";
import { Announcement } from "../types/Announcement";

export const AnnouncementAPI = {
    getAnnouncements,
};

function getAnnouncements(config: { user?: number } = {}) {
    return axios
        .get(FRONTEND_API_URL + "/api/announcement/", {
            params: {
                user: config.user,
            },
        })
        .then((res: AxiosResponse<AnnouncementAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface AnnouncementAPIData extends Array<Announcement> {}
