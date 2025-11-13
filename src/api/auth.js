import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global";

export const register = async (data) => {
  const res = await axios.post("/users/signup", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post("/users/signin", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  await axios.post("/users/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const res = await axios.get("/users/current", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// export const getWords = async () => {
