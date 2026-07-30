import axios from "axios";

const api = axios.create({
    baseURL: "https://paw-back.onrender.com/"
});

export default api;

