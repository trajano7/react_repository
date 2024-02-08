import { useEffect, useMemo, useState } from "react";
import hiraganaTable from "../data/hiraganaTable.jsx";
import HiraganaTest from "./HiraganaTest";
import QuizResult from "./QuizResult.jsx";

const shuffleKanas = () => {
  let array = [...hiraganaTable];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return [...array];
};

const HiraganaQuiz = (props) => {
  const [lastQuizScore, setLastQuizScore] = useState(null);
  const [newQuiz, setNewQuiz] = useState(true);
  const [shuffledKanas, setShuffledKanas] = useState(null);

  //   const shuffledKanas = useMemo(() => {
  //     if (newQuiz === true) shuffleKanas();
  //   }, [newQuiz]);

  useEffect(() => {
    if (newQuiz) {
      setShuffledKanas(shuffleKanas());
    }
  }, [newQuiz]);

  const finishQuizHandler = (mistakes) => {
    console.log("finished quiz");
    const score = 46 - mistakes;
    props.onNewScore(score);
    setLastQuizScore(score);
    setNewQuiz(false);
  };

  const startNewQuizHandler = () => {
    setNewQuiz(true);
  };

  let quizContent = (
    <HiraganaTest onFinishQuiz={finishQuizHandler} kanas={shuffledKanas} />
  );

  if (!newQuiz) {
    quizContent = (
      <QuizResult
        onNewQuiz={startNewQuizHandler}
        onReturn={props.onReturn}
        score={lastQuizScore}
      />
    );
  }

  return <>{shuffledKanas !== null ? quizContent : <div></div> }</>;
};

export default HiraganaQuiz;
