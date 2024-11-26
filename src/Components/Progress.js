import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { answer, index, points, questionsNum, totalPoints } = useQuiz();

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
