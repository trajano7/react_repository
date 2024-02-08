import styles from "./QuizResult.module.css";

const QuizResult = (props) => {
    return <div className={styles['quiz-result']}>
        <h1>Resultado</h1>
        <h2>{`${props.score}/46`}</h2>
        <p>acertos</p>
        <div className={styles["button-container"]}>
            <button onClick={props.onReturn} className={styles.button} >Menu Inicial</button>
            <button onClick={props.onNewQuiz} className={styles.button} >Novo Quiz</button>
        </div>
    </div>
};

export default QuizResult;