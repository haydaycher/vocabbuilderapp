import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

// Додаємо токен в заголовки при необхідності
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const register = async (data) => {
  const res = await axios.post("/users/signup", data);
  localStorage.setItem("token", res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post("/users/signin", data);
  localStorage.setItem("token", res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  await axios.post("/users/signout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem("token");
  setAuthToken(null);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await axios.get("/users/current", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
