import styles from "./MainMenu.module.css";

const MainMenu = (props) => {
  const startQuiz = () => {
    props.changeScreenContent("quiz");
  };

  const showAlphabet = () => {
    props.changeScreenContent("alphabet");
  };

  let bestResult = "Ainda não houve nenhuma tentativa!";

  if (props.bestScore > 0) {
    bestResult = `${props.bestScore}/46 acertos`;
  }

  return (
    <div className={styles.menu}>
      <h1>Hiragana Test</h1>
      <div className={styles["menu-actions"]}>
        <button className={styles["start-button"]} onClick={startQuiz}>
          Iniciar
        </button>
        <div className={styles["options-button"]}>
          <button className={styles["option-button"]} onClick={showAlphabet}>
            <span className="material-symbols-outlined">
              language_japanese_kana
            </span>
          </button>
          {/* <button className={styles["option-button"]} onClick={props.startTest}>
            <span className="material-symbols-outlined">leaderboard</span>
          </button> */}
        </div>
        <div className={styles["best-result"]}>
          <h3>Melhor Resultado</h3>
          <div>{bestResult}</div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
