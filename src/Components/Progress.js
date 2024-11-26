import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { answer, index, points, questions } = useQuiz();
  const questionsNum = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <div className="progress">
      <progress max={questionsNum} value={index + +(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsNum}
      </p>
      <p>
        Points {points} / {totalPoints}
      </p>
    </div>
  );
}

export default Progress;
