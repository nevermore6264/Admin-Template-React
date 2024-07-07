/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
    reactStrictMode: false,

    publicRuntimeConfig: {
        // Các biến môi trường cần thiết
        url: process.env.API_URL,
        path: process.env.API_PATH
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
    }
};

module.exports = nextConfig;
