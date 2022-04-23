const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <h2>Score: {score}</h2>
      <h3>Get to 35 to win!</h3>
    </div>
  );
};

export default ScoreBoard;
