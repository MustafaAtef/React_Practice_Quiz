import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { questionsNum, answer, dispatch, index } = useQuiz();
  if (answer === null) return;
  if (index < questionsNum - 1)
    return (
      <div
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </div>
    );
  if (index === questionsNum - 1)
    return (
      <div className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </div>
    );
}

export default NextButton;
