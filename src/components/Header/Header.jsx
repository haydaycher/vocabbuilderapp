import css from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={css.header}>
      <div
        className={css.logo_wrapper}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <svg className={css.logo_svg} width="40" height="40">
          <use href="/src/assets/icons/sprite.svg#icon-favicon-mobile" />
        </svg>
        <span className={css.logo_text}>VocabBuilder</span>
      </div>
    </header>
  );
};

export default Header;
