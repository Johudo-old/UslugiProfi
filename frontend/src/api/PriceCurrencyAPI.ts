import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { PriceCurrency } from "../types/PriceCurrency";
import { APIUtils } from "../utils/APIUtils";

export const PriceCurrencyAPI = {
    getPriceCurrencies,
};

function getPriceCurrencies() {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/django-api/price_currency/", { headers: defaultHeaders })
        .then((res: AxiosResponse<PriceCurrencyAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface PriceCurrencyAPIData extends Array<PriceCurrency> {}
