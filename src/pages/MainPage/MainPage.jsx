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
    <div className={css.mainpage_container}>
      <div
        className={`${css.logo_wrapper} ${visible ? css.visible : ""}`}
        onClick={() => navigate("/register")}
      >
        <svg className={css.logo_svg} width="40" height="40">
          <use href="/src/assets/icons/sprite.svg#icon-favicon-mainpage" />
        </svg>

        <span className={css.logo_text}>VocabBuilder</span>
      </div>
    </div>
  );
}
