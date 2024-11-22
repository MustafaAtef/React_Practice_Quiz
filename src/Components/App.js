import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: null,
};

function reducer(currentState, action) {
  switch (action.type) {
    case "questionsLoaded":
      return { ...currentState, questions: action.payload, status: "ready" };
    case "startQuiz":
      return {
        ...currentState,
        status: "active",
        timeRemaining: currentState.questions.length * 30,
      };
    case "makeAnswer":
      return {
        ...currentState,
        answer: action.payload,
        points:
          action.payload ===
          currentState.questions[currentState.index].correctOption
            ? currentState.points +
              currentState.questions[currentState.index].points
            : currentState.points,
      };
    case "nextQuestion":
      return { ...currentState, index: currentState.index + 1, answer: null };
    case "finish":
      return {
        ...currentState,
        status: "finish",
        highscore: Math.max(currentState.highscore, currentState.points),
      };
    case "tick":
      return {
        ...currentState,
        timeRemaining: currentState.timeRemaining - 1,
        status:
          currentState.timeRemaining === 0 ? "finish" : currentState.status,
        highscore:
          currentState.timeRemaining === 0
            ? Math.max(currentState.highscore, currentState.points)
            : currentState.highscore,
      };
    case "restart":
      return {
        ...currentState,
        index: 0,
        answer: null,
        status: "ready",
        points: 0,
      };
    case "error":
      return { ...currentState, status: "error" };
    default:
      throw new Error("invalid action type");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionsNum = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "questionsLoaded", payload: data }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: "error" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNum={questionsNum} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              index={index}
              points={points}
              questionsNum={questionsNum}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <footer>
              <Timer timeRemaining={timeRemaining} dispatch={dispatch} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                questionsNum={questionsNum}
              />
            </footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
