import { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(form);
      setUser(user);
      navigate("/dictionary");
    } catch (err) {
      setError(err.response?.data?.message || "Помилка реєстрації");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Ім’я"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
