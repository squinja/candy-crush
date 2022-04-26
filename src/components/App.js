import React, { useEffect, useState } from "react";

import Logo from "./Logo";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const App = () => {
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="app">
      <div className="left-column">
        <Logo />
        <ScoreBoard
          score={scoreDisplay}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </div>

      <GameBoard
        scoreDisplay={scoreDisplay}
        currentUser={currentUser}
        setScoreDisplay={setScoreDisplay}
      />
    </div>
  );
};

export default App;
