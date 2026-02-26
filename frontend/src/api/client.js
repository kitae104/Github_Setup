import axios from "axios";

const TOKEN_KEY = "accessToken";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const client = axios.create({
    baseURL: "/api/v1",
});

client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            clearToken();
            if (globalThis.location.pathname !== "/login") {
                globalThis.location.replace("/login");
            }
        }
        return Promise.reject(error);
    },
);

export default client;
