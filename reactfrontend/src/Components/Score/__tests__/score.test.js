import React from 'react';
import ReactDOM from 'react-dom';
import Score from '../Score';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

var wordsArr = ["apple", "oranges", "kiwi", "mango"];

it("Score renders without crashing",() => {
  const div = document.createElement("div");
  ReactDOM.render(<Score words={wordsArr} />, div);
});


it("Score is calculated correctly",() => {
  const {getByTestId} = render(<Score words = {wordsArr}/>);
  expect (getByTestId('score')).toHaveTextContent("21");
});
