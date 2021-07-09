import axios from 'axios';
import storage from "@/controller/LocalStorage.js";
import dotenv from "@/dotenv.js";
// export const HTTP = axios.create({
//     baseURL: 'http://localhost:3000/',
//     headers: {
//         Authorization: {
//             toString() {
//                 return `Bearer ${storage.get("user-token")}`
//             }
//         }
//     }
// })

// export const MultPart = axios.create({
//     baseURL: `http://localhost:3000/`,
//     headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`
//     },

// })

const http = axios.create({
    baseURL: dotenv.baseURL,
    headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
    function(config) {
        const token = storage.get("user-token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export const HTTP = http;