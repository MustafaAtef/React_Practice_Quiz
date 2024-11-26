import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        timeRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const data = useContext(QuizContext);
  if (data === undefined)
    throw new Error("can't use the context before the provider");
  return data;
}

export { QuizProvider, useQuiz };
