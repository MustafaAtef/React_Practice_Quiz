function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        <span>🏆</span> You scored{" "}
        <strong>
          {points} out of {totalPoints} ({percentage}%)
        </strong>
      </p>
      <p className="highscore">(Highscore is {highscore}) points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
