import axios from "axios";
import type { AxiosInstance } from "axios";
export const request:AxiosInstance = axios.create({
    baseURL: "",
    timeout: 5000
})