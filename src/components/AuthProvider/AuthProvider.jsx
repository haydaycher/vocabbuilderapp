// src/components/AuthProvider/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { api, setAuthToken } from "../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const registerUser = async (data) => {
    try {
      const res = await api.post("/users/signup", data);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Помилка реєстрації");
    }
  };

  const login = async (data) => {
    try {
      const res = await api.post("/users/login", data);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Помилка авторизації");
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (e) {
      console.warn("Помилка при logout:", e.message);
    }
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
