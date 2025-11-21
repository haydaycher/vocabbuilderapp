import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./RegisterPage.module.css";

// Схема валідації
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^[A-Za-z\d]{7,}$/,
      "Password must have at least 7 characters and letters + numbers"
    ),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth(); // для бекенду
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      await registerUser(data); // виклик бекенду
      navigate("/dictionary");
    } catch (err) {
      setServerError(err.message || "Server error");
    }
  };

  return (
    <section className={css.register_section}>
      <div className={css.register_container}>
        <h2 className={css.register_h}>Register</h2>
        <form className={css.form_register} onSubmit={handleSubmit(onSubmit)}>
          <input {...formRegister("name")} placeholder="Name" />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

          <input {...formRegister("email")} placeholder="Email" />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}

          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...formRegister("password")}
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

          <button className={css.register_btn} type="submit">
            Register
          </button>
        </form>
        {serverError && <p style={{ color: "red" }}>{serverError}</p>}
        <a className={css.register_link} href="/login">
          Login
        </a>
      </div>
    </section>
  );
};

export default RegisterPage;
