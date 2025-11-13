import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/users/current", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  return { user, isLoading };
};
