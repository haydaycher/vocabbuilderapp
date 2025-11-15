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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

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
        <div className={css.illustration}>
          <img
            className={css.illustration_img}
            src="/src/assets/images/illustration_mob.webp"
            srcSet="/src/assets/images/illustration_mob2x.webp 2x,
                    /src/assets/images/illustration_desk.webp 1x,
                    /src/assets/images/illustration_desk2x.webp 2x"
            alt="Illustration"
          />
        </div>
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
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "16px 50px 16px 18px",
                  boxSizing: "border-box",
                  borderRadius: "15px",
                  border: "1px solid rgba(18, 20, 23, 0.1)",
                }}
              />
              <button
                type="button"
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <svg width="24" height="24">
                  <use
                    xlinkHref={`/src/assets/icons/sprite.svg#${
                      showPassword ? "icon-eye" : "icon-eye-off"
                    }`}
                  />
                </svg>
              </button>
            </div>
            <button className={css.register_btn} type="submit">
              Register
            </button>
            <a className={css.register_link} href="/login">
              Login
            </a>
          </form>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className={css.register_low_container}>
        <a>Word</a> <a>Translation</a> <a>Grammar</a> <a>Progress</a>
      </div>
    </section>
  );
};

export default RegisterPage;
