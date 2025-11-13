import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout: handleLogout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
