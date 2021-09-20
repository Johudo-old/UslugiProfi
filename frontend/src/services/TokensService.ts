export const TokensService = {
    setRefreshTokenToLocalStorage: setRefreshTokenToLocalStorage,
    setRefreshTokenToSessionStorage: setRefreshTokenToSessionStorage,
    getRefreshToken: getRefreshToken,
    deleteRefreshToken: deleteRefreshToken,
};

function setRefreshTokenToLocalStorage(refreshToken: string) {
    localStorage.setItem("refresh_token", refreshToken);
}

function setRefreshTokenToSessionStorage(refreshToken: string) {
    sessionStorage.setItem("refresh_token", refreshToken);
}

function getRefreshToken(): string {
    return localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token") || "";
}

function deleteRefreshToken() {
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("refresh_token");
}
