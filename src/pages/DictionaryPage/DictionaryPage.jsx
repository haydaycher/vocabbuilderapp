import { useAuth } from "../../context/AuthContext";

const DictionaryPage = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Привіт, {user?.name || "користувачу"}!</h2>
      <p>Це приватна сторінка словника.</p>
      <button onClick={logout}>Вийти</button>
    </div>
  );
};

export default DictionaryPage;
