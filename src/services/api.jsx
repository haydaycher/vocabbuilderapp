// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
});

// Проставляємо токен у заголовки
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Auth API
export const register = async (data) => {
  const res = await api.post("/users/signup", data);
  localStorage.setItem("token", res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/users/signin", data);
  localStorage.setItem("token", res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

export const logout = async () => {
  await api.post("/users/signout");
  localStorage.removeItem("token");
  setAuthToken(null);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  setAuthToken(token); // дуже важливо
  const res = await api.get("/users/current");
  return res.data;
};
