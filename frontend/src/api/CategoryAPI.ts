import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { Category } from "../types/Category";
import { APIUtils } from "../utils/APIUtils";

export const CategoryAPI = {
    getCategories,
};

function getCategories(config: { with_subcategories?: boolean } = {}) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/django-api/category/", {
            params: config,
            headers: defaultHeaders,
        })
        .then((res: AxiosResponse<CategoryAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface CategoryAPIData extends Array<Category> {}
