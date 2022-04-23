import React, { useState, useEffect } from "react";
import blueCandy from "../images/blue-candy.png";
import yellowCandy from "../images/yellow-candy.png";
import orangeCandy from "../images/orange-candy.png";
import greenCandy from "../images/green-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import blank from "../images/blank.png";
import ScorePopup from "./ScorePopup";

import WinState from "./WinState";

const Game = ({ scoreDisplay, setScoreDisplay }) => {
  const width = 8;
  const candyColors = [
    blueCandy,
    greenCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
  ];

  const [currentColorArragement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [previousTurnScore, setPreviousTurnScore] = useState(0);
  const [scoreBeingChanged, setScoreBeingChanged] = useState(false);
  const [changeInScore, setChangeInScore] = useState(0);
  const [noClickBlocker, setNoClickBlocker] = useState(true);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArragement[i];
      const isBlank = currentColorArragement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArragement[square] === decidedColor && !isBlank
        )
        // Change the board if true!
      ) {
        // Adds to total score
        setChangeInScore((score) => score + 4);
        setScoreDisplay((score) => score + 4);

        // Changes the winning blocks, and above, to blank for each useEffect render
        columnOfFour.forEach(
          (square) => (currentColorArragement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArragement[i];
      const isBlank = currentColorArragement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArragement[square] === decidedColor && !isBlank
        )
      ) {
        setChangeInScore((score) => score + 3);
        setScoreDisplay((score) => score + 3);

        columnOfThree.forEach(
          (square) => (currentColorArragement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArragement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArragement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArragement[square] === decidedColor && !isBlank
        )
      ) {
        setChangeInScore((score) => score + 3);
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArragement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArragement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArragement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArragement[square] === decidedColor && !isBlank
        )
      ) {
        setChangeInScore((score) => score + 4);
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentColorArragement[square] = blank));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArragement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArragement[i] = candyColors[randomNumber];
      }

      if (currentColorArragement[i + width] === blank) {
        currentColorArragement[i + width] = currentColorArragement[i];
        currentColorArragement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    // Set the previous turn's score
    setPreviousTurnScore(scoreDisplay);

    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArragement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArragement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setScoreBeingChanged(true);
      // This timer allows for the score popup component to display
      setTimeout(() => {
        setScoreBeingChanged(false);
        setChangeInScore(0);
      }, 2000);

      console.log("Total score: ", scoreDisplay);
      console.log("Previous turn score: ", previousTurnScore);

      console.log("Change in score: ", changeInScore);

      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArragement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArragement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArragement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }

    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
    setTimeout(() => {
      setNoClickBlocker(false);
      setChangeInScore(0);
    }, 2000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();

      setCurrentColorArrangement([...currentColorArragement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForRowOfFour,
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArragement,
  ]);

  return (
    <div>
      <div
        className={`game ${
          noClickBlocker || (scoreDisplay > 34 && "no-click")
        } `}
      >
        {scoreDisplay > 34 ? <WinState score={scoreDisplay} /> : null}
        {scoreBeingChanged && <ScorePopup score={changeInScore} />}
        {currentColorArragement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            className={`square ${
              index ===
                parseInt(squareBeingReplaced?.getAttribute("data-id")) &&
              "shake-square-animation"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
