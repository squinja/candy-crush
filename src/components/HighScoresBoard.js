import React from "react";

const HighScoresBoard = ({
  userScores,
  loadedData,
  deleteUser,
  currentUser,
}) => {
  const descendingUserScores = userScores.sort(
    (a, b) => b.highscore - a.highscore
  );

  return (
    <div className="high-scores-board">
      <h2>High Scores:</h2>
      {loadedData ? (
        descendingUserScores.map((userScore, index) => (
          <div className="align-left" key={index}>
            <h3>
              {index + 1}. {userScore.userName}: {userScore.highscore}
            </h3>
            {currentUser === userScore.userName ? (
              <button onClick={() => deleteUser(userScore.userName)}>X</button>
            ) : null}
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default HighScoresBoard;
