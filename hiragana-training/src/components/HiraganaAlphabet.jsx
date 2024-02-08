import Card from "../UI/Card";
import hiraganaTable from "../data/hiraganaTable";
import styles from "./HiraganaAlphabet.module.css";

const HiraganaAlphabet = (props) => {
  const hiraganaAlphabet = hiraganaTable.map((item) => {
    return (
      <Card key={item["kana"]} className={styles["hiragana-card"]}>
        {item["kana"]}
        <p>{item["syllable"]}</p>
      </Card>
    );
  });

  return (
    <div className={styles["alphabet-screen"]}>
      <h1>Kana Principal</h1>
      <div className={styles["hiragana-alphabet"]}>{hiraganaAlphabet}</div>
    </div>
  );
};

export default HiraganaAlphabet;
