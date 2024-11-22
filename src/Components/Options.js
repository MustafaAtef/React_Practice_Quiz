function Options({ question, answer, dispatch }) {
  return (
    <div>
      <div className="options">
        {question.options.map((opt, idx) => (
          <button
            className={`btn btn-option ${
              answer !== null
                ? idx === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } ${answer === idx ? "answer" : ""}`}
            key={opt}
            onClick={() => dispatch({ type: "makeAnswer", payload: idx })}
            disabled={answer !== null}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
