import React, { useState } from "react";
import ScoreBoard from "./ScoreBoard";
import Game from "./Game";

const GameBoard = ({ scoreDisplay, setScoreDisplay }) => {
  console.log("scoreDisplay", scoreDisplay);
  return (
    <div>
      Gameboard
      <Game scoreDisplay={scoreDisplay} setScoreDisplay={setScoreDisplay} />
    </div>
  );
};

export default GameBoard;
