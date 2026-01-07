import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
