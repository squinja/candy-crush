import React, { useEffect, useState } from "react";

import Logo from "./Logo";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const App = () => {
  const [scoreDisplay, setScoreDisplay] = useState(0);
  return (
    <div className="app">
      <div className="left-column">
        <Logo />
        <ScoreBoard score={scoreDisplay} />
      </div>

      <GameBoard
        scoreDisplay={scoreDisplay}
        setScoreDisplay={setScoreDisplay}
      />
    </div>
  );
};

export default App;
