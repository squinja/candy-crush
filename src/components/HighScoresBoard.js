import React from "react";

const HighScoresBoard = ({ userScores }) => {
  const descendingUserScores = userScores?.sort(
    (a, b) => b.highscore - a.highscore
  );

  return (
    <div className="high-scores-board">
      <h2>High Scores:</h2>
      {descendingUserScores?.map((userScore, index) => (
        <div className="align-left" key={index}>
          <h3>
            {index + 1}. {userScore.userName}: {userScore.highscore}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default HighScoresBoard;
