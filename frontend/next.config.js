/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(path.resolve(), "..", ".env") });

module.exports = {
    reactStrictMode: true,
    ...withImages(),
    env: {
        JWT_AUTH_HEADER_PREFIX: process.env.JWT_AUTH_HEADER_PREFIX,
        GOOGLE_MAP_TOKEN: process.env.GOOGLE_MAP_TOKEN,
    },
};
