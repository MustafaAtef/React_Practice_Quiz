import { useEffect } from "react";

function Timer({ timeRemaining, dispatch }) {
  const mins = (timeRemaining / 60).toFixed(0);
  const secs = timeRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;