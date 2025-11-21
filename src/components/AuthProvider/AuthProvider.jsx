import { createContext, useContext, useState, useEffect } from "react";
import { api, setAuthToken } from "../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проставляємо токен у заголовки Axios
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  // Завантажуємо поточного користувача
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/users/current");
        setUser(res.data);
      } catch (e) {
        console.warn("Token invalid → deleting");
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  const registerUser = async (data) => {
    const res = await api.post("/users/signup", data);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser({ name: res.data.name, email: res.data.email });
    return res.data;
  };

  const login = async (data) => {
    const res = await api.post("/users/signin", data);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser({ name: res.data.name, email: res.data.email });
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/users/signout");
    } catch (e) {
      console.warn("Помилка при logout:", e.message);
    }
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
