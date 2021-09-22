import axios, { AxiosError, AxiosResponse } from "axios";
import { Coords } from "google-map-react";
import { GOOGLE_MAP_TOKEN } from "../../config";

export const GoogleMapAPI = {
    reverseGeocoding,
    geocoding,
};

function reverseGeocoding(coordinates: Coords) {
    return axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                latlng: `${coordinates.lat}, ${coordinates.lng}`,
                key: GOOGLE_MAP_TOKEN,
            },
        })
        .then((res: AxiosResponse<GeocodingAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function geocoding(address: string) {
    return axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address,
                key: GOOGLE_MAP_TOKEN,
            },
        })
        .then((res: AxiosResponse<GeocodingAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

export interface GeocodingAPIData {
    results: Array<{
        address_components: Array<{
            long_name: string;
            short_name: string;
            types: Array<string>;
        }>;
        formatted_address: string;
        geometry: {
            location: Coords;
            location_type: string;
            viewport: {
                northeast: Coords;
                southwest: Coords;
            };
        };
        place_id: string;
        types: Array<string>;
    }>;
}
