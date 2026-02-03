import axios from "axios";

const api = axios.create({
  baseURL: "https://edunexa.runasp.net/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
export default api;
