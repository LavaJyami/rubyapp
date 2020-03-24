import React from 'react';
import ReactDOM from 'react-dom';
import Wordlist from '../Wordlist';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

var wordlistArr = ["apple", "oranges", "game", "pc"]
it("Word list renders without crashing",() => {
  const div = document.createElement("div");
  ReactDOM.render(<Wordlist value={wordlistArr} />, div);
});


it("Words in the word list component are rendered correctly",() => {
  const {getByTestId} = render(<Wordlist value = {wordlistArr}/>);
  expect (getByTestId('wordlist')).toHaveTextContent("apple");
});
