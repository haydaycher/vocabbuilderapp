import css from "./HomePage.module.css";
import svg from "/src/assets/icons/sprite.svg";
const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.home_container}>
        <h1 className={css.home_title}>VocabBuilder</h1>
      </div>
    </section>
  );
};

export default HomePage;
