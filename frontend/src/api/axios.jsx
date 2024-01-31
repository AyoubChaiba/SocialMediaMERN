import axios from "axios";

const AXIOS_CLIENT = axios.create({
    baseURL: import.meta.env.VITE_APP_URL_API
});

AXIOS_CLIENT.interceptors.request.use((config) => {
    let token = JSON.parse(sessionStorage.getItem('currentToken'));
    if (token) {
        config.headers['Content-Type'] = 'application/json/multipart/form-data';
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { AXIOS_CLIENT };
