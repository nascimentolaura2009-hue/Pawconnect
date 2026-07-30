import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000, // Timeout expandido para 25s para absorver o Cold Start do Render
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição: injeta o JWT token se disponível
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pawconnect_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta: tratamento de erros globais (Cold Start / Network Timeout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      console.warn("⚠️ [AXIOS TIMEOUT]: O servidor está inicializando (Cold Start). Aguarde alguns segundos...");
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
