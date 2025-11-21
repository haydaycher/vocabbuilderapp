import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LoginPage.module.css";
import { Link } from "react-router-dom";

// Валідація для логіну
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7,}$/,
      "Password must have at least 7 characters, 6 letters and 1 number"
    ),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/dictionary");
    } catch (err) {
      const message =
        err.response?.status === 401
          ? "Invalid email or password"
          : err.response?.data?.message || err.message || "Server error";
      setServerError(message);
    }
  };


  return (
    <section className={css.login_section}>
      <div className={css.login_container}>
        <h2 className={css.login_h}>Login</h2>
        <form className={css.form_login} onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} placeholder="Email" />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}

          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
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
              onClick={() => setShowPassword((prev) => !prev)}
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
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

          <button className={css.login_btn} type="submit">
            Login
          </button>
        </form>

        {serverError && <p style={{ color: "red" }}>{serverError}</p>}

        <Link className={css.login_link} to="/register">
          Register
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;
