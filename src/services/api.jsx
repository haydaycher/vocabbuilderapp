// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
