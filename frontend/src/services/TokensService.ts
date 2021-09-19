import Cookies from "js-cookie";

export const TokensService = {
    setRefreshTokenToLocalStorage: setRefreshTokenToLocalStorage,
    setRefreshTokenToSessionStorage: setRefreshTokenToSessionStorage,
    getRefreshToken: getRefreshToken,
    deleteRefreshToken: deleteRefreshToken,
};

function setRefreshTokenToLocalStorage(refreshToken: string) {
    localStorage.setItem("refresh_token", refreshToken);
    Cookies.set("refresh_token", refreshToken);
}

function setRefreshTokenToSessionStorage(refreshToken: string) {
    sessionStorage.setItem("refresh_token", refreshToken);
    Cookies.set("refresh_token", refreshToken);
}

function getRefreshToken(): string {
    if (typeof window !== "undefined")
        return localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token") || "";
    else return Cookies.get("refresh_token") || "";
}

function deleteRefreshToken() {
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("refresh_token");
    Cookies.remove("refresh_token");
}
