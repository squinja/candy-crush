import React, { useState } from "react";
import ScoreBoard from "./ScoreBoard";
import Game from "./Game";

const GameBoard = ({ scoreDisplay, setScoreDisplay, currentUser }) => {
  return (
    <div>
      Gameboard
      <Game
        scoreDisplay={scoreDisplay}
        setScoreDisplay={setScoreDisplay}
        currentUser={currentUser}
      />
    </div>
  );
};

export default GameBoard;
