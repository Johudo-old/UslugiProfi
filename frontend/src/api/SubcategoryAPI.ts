import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { Subcategory } from "../types/Subcategory";
import { APIUtils } from "../utils/APIUtils";

export const SubcategoryAPI = {
    getSubcategories,
};

function getSubcategories(config: { with_category?: boolean } = {}) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/django-api/subcategory/", { params: config, headers: defaultHeaders })
        .then((res: AxiosResponse<SubcategoryAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface SubcategoryAPIData extends Array<Subcategory> {}
