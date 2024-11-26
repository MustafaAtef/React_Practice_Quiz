import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { questions, dispatch } = useQuiz();
  const questionsNum = questions.length;
  return (
    <div className="start">
      <h2>Welcome To The React Quiz!</h2>
      <h3>{questionsNum} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
