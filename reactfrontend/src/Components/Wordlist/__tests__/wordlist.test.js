import React from 'react';
import ReactDOM from 'react-dom';
import Wordlist from '../Wordlist';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

afterEach(cleanup);

var wordlistArr = ["apple", "oranges", "game", "pc"]
var wordlistArr1 = ["a"]
var wordlistArr2 = [""]

it("Word list renders without crashing",() => {
  const div = document.createElement("div");
  ReactDOM.render(<Wordlist value={wordlistArr} />, div);
});


it("Words in the word list component are rendered properly",() => {
  const {getByTestId} = render(<Wordlist value = {wordlistArr}/>);
  expect (getByTestId('wordlist')).toHaveTextContent("apple");
});

it("Words in the word list component are rendered properly",() => {
  const {getByTestId} = render(<Wordlist value = {wordlistArr1}/>);
  expect (getByTestId('wordlist')).toHaveTextContent("a");
});

it("Words in the word list component are rendered properly",() => {
  const {getByTestId} = render(<Wordlist value = {wordlistArr2}/>);
  expect (getByTestId('wordlist')).toHaveTextContent("");
});

it("matches snapshot",  () => {
  const tree = renderer.create(<Wordlist value = {wordlistArr} />).toJSON();
  expect(tree).toMatchSnapshot();
});
