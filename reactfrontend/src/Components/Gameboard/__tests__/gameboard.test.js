import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from '../GameBoard';

it("game renders without crashing",() => {
  const div = document.createElement("div");
  ReactDOM.render(<Gameboard />, div);
})
