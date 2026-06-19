import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("careernest_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("careernest_user");
      localStorage.removeItem("careernest_token");
    }
    return Promise.reject(error);
  }
);
