// src/components/Header/Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { token, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        padding: "10px 20px",
        background: "#f5f5f5",
      }}
    >
      <Link to="/">Головна</Link>
      {!token && (
        <>
          <Link to="/login">Увійти</Link>
          <Link to="/register">Реєстрація</Link>
        </>
      )}
      {token && (
        <>
          <Link to="/dictionary">Мій словник</Link>
          <button onClick={logout}>Вийти</button>
        </>
      )}
    </header>
  );
};
