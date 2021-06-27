import axios from 'axios';
import storage from "@/controller/LocalStorage.js";
const token = storage.get("user-token")
export const HTTP = axios.create({
    baseURL: `http://localhost:3000/`,
    headers: {
        Authorization: `Bearer ${token}`
    }
})