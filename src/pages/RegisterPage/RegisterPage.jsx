import { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import css from "./RegisterPage.module.css";

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
    <section className={css.register_section}>
      <div className={css.register_bg}>
        <div className={css.logo_wrapper}>
          <svg className={css.logo_svg} width="40" height="40">
            <use href="/src/assets/icons/sprite.svg#icon-favicon-mobile" />
          </svg>

          <span className={css.logo_text}>VocabBuilder</span>
        </div>
        <div className={css.illustration}></div>
      </div>
      <div className={css.register_container}>
        <div className={css.register_head_wrapper}>
          <h2 className={css.register_h}>Register</h2>
          <p className={css.register_p}>
            To start using our services, please fill out the registration form
            below. All fields are mandatory:
          </p>
        </div>
        <div className={css.register_input_wrapper}>
          <form className={css.form_register} onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
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
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </form>
          <button className={css.register_btn} type="submit">
            Register
          </button>
          <a>Login</a>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </section>
  );
};

export default RegisterPage;
