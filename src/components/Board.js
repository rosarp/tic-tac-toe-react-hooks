import React, { useState } from 'react';
import Square from './Square'

function Board(props) {
  const [values, setValues] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(values);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function renderSquares(rows, cols) {
    var squares = [];
    for (var i = 0; i < rows; ++i) {
      var rowArr = [];
      for (var j = 0; j < cols; ++j) {
        const n = (i*rows) + j;
        rowArr.push(<Square key={n} id={n} value={values[n]} onClick={() => handleClick(n)} />);
      }
      squares.push(<div className="board-row">{rowArr}</div>)
    }
    return squares;
  }

  function handleClick(n) {
    const newValues = values.slice();
    if (calculateWinner(newValues) || newValues[n]) {
      return;
    }
    newValues[n] = xIsNext ? 'X' : 'O';
    setValues(newValues);
    setXIsNext(!xIsNext);
  }

  return (
    <div>
      <div className="status">{status}</div>
        {renderSquares(3, 3)}
    </div>
  )
}

export default Board;
