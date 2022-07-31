import React, { useState } from "react";
import Board from "./Board";
import { CalculateWinner } from "./Helper";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = CalculateWinner(history[stepNumber]);
  const XO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    //retrun if won or occupied
    if (winner || squares[i]) return;
    //select square
    squares[i] = XO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  // const renderMoves = () =>
  //   history.map((_step, move) => {
  //     const destination = move ? `Got to move # ${move}` : "Go to start";
  //     return (
  //       <li key={move}>
  //         <button onClick={() => jumpTo(move)}> {destination} </button>
  //       </li>
  //     );
  //   });

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move # ${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <div>
      <h1> Waxx Tic Tac Toe Game </h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3> {winner ? "Winner: " + winner : "Next Player: " + XO} </h3>
      </div>
    </div>
  );
};
export default Game;
