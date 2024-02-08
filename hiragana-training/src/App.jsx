import { useEffect, useState } from "react";
import "./App.css";
import HiraganaTest from "./components/HiraganaTest";
import MainMenu from "./components/MainMenu";
import hiraganaTable from "./data/hiraganaTable.jsx";
import HiraganaAlphabet from "./components/HiraganaAlphabet.jsx";
import HiraganaQuiz from "./components/HiraganaQuiz.jsx";

const shuffleKanas = () => {
  let array = [...hiraganaTable];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return [...array];
};

function App() {
  const [screenContent, setScreenContent] = useState("mainMenu");
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const bestResult = localStorage.getItem("bestResult")
    if (bestResult !== null) {
      setBestScore(bestResult)
    }
  }, [])

  const changeScreenContent = (content) => {
    console.log(content);
    setScreenContent(content);
  };

  const returnToMenu = () => {
    setScreenContent("mainMenu");
  };

  const setQuizScore = (lastScore) => {
    if (lastScore > bestScore) {
      setBestScore(lastScore);
      localStorage.setItem("bestResult", lastScore)
    }
  }

  let currentContent = (
    <MainMenu bestScore={bestScore} changeScreenContent={changeScreenContent}></MainMenu>
  );

  if (screenContent === "quiz") {
    currentContent = (
      <HiraganaQuiz onNewScore={setQuizScore} onReturn={returnToMenu}  />
    );
  } else if (screenContent === "alphabet") {
    currentContent = <HiraganaAlphabet />;
  }
  else if (screenContent === "quizResult") {
    currentContent = ""
  }

  return (
    <div className="App">
      {screenContent !== "mainMenu" && (
        <button onClick={returnToMenu} className="exit-bttn">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}
      {currentContent}
    </div>
  );
}

export default App;
