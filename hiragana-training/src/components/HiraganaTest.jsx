import { useEffect, useReducer, useState } from "react";
import styles from "./HiraganaTest.module.css";
import Card from "../UI/Card";
import hiraganaTable from "../data/hiraganaTable";

const answerStatusReducer = (state, action) => {
  if (action.type === "wrong_answer") {
    let newMistakes = state.mistakes.slice(0, state.mistakes.length);
    let newMistakesCount = state.mistakesCount;
    newMistakes[action.index] += 1;
    if (newMistakes[action.index] === 1) {
      newMistakesCount += 1;
    } 
    return { wrongAnswer: true, mistakes: newMistakes, mistakesCount: newMistakesCount };
  }
  if (action.type === "reset_flag") {
    return { wrongAnswer: false, mistakes: state.mistakes, mistakesCount: state.mistakesCount };
  }
};

const HiraganaTest = (props) => {
  const [responseText, setResponseText] = useState("");
  const [currentKana, setCurrentKana] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerStatus, dispatch] = useReducer(answerStatusReducer, {
    wrongAnswer: false,
    mistakes: Array(46).fill(0),
    mistakesCount: 0
  });

  const changeInputHandler = (event) => {
    if (answerStatus.wrongAnswer) {
      dispatch({ type: "reset_flag" });
    }
    setResponseText(event.target.value);
  };

  const checkKanaHandler = (event) => {
    event.preventDefault();
    if (responseText !== props.kanas[currentKana]["syllable"]) {
      dispatch({
        type: "wrong_answer",
        index: props.kanas[currentKana]["index"],
      });
      setResponseText("");
      return;
    }
    if (currentKana === hiraganaTable.length - 1) {
      console.log(answerStatus.mistakesCount)
      props.onFinishQuiz(answerStatus.mistakesCount);
      return;
    }
    setCurrentKana((prevKana) => {
      return prevKana + 1;
    });
    setResponseText("");
    setShowAnswer(false);
    dispatch({ type: "reset_flag" });
  };

  const showAnswerHandler = () => {
    setShowAnswer(true);
  };

  console.log("wrong:", answerStatus.wrongAnswer)
  const classes = `${styles["hiragana-test"]} ${
    (answerStatus.wrongAnswer && responseText === "")
      ? styles["wrong-answer"]
      : ""
  }`;

  let answer = (
    <button
      hidden={false}
      onClick={showAnswerHandler}
      className={styles["answer-bttn"]}
    >
      Mostrar <br /> Resposta
    </button>
  );

  if (showAnswer) {
    answer = (
      <h2 className={styles.answer}>{props.kanas[currentKana]["syllable"]}</h2>
    );
  }

  return (
    <div className={classes}>
      <Card className={styles["hiragana-card"]}>
        {props.kanas[currentKana]["kana"]}
      </Card>
      <form onSubmit={checkKanaHandler} className={styles["hiragana-form"]}>
        <input
          value={responseText}
          onChange={changeInputHandler}
          className={styles["hiragana-response"]}
        ></input>
      </form>
      {answer}
    </div>
  );
};

export default HiraganaTest;
