import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import css from "./MainPage.module.css";

export default function MainPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dictionary");
    } else {
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className={css["mainpage-container"]}>
      <div
        className={`${css["logo-wrapper"]} ${visible ? css.visible : ""}`}
        onClick={() => navigate("/register")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={css["logo-svg"]}
        >
          <path d="M12 2L2 12h3v8h14v-8h3L12 2z" />
        </svg>

        <span className={css["logo-text"]}>VocabBuilder</span>
      </div>
    </div>
  );
}
