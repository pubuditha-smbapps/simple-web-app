import axios from "axios";
import { clearAuthState } from "../services/authService";

const API_BASE =
  (import.meta.env.VITE_API_BASE as string) || "http://localhost:3000/api";
axios.defaults.baseURL = API_BASE;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthState();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
