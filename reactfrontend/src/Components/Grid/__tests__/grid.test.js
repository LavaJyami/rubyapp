import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '../Grid';

import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';


afterEach(cleanup);

it("Mainboard renders without crashing",() => {
  const div = document.createElement("div");
  ReactDOM.render(<Grid value={[["A","B","c","d"],["A","B","c","d"],["A","B","c","d"],["A","B","c","d"]]} />, div);
});

var boardValue = [["A","B","c","d"],["A","B","c","d"],["A","B","c","d"],["A","B","c","d"]];

it("Grid texts and letters are rendered correctly",() => {
  const {getByTestId} = render(<Grid value = {boardValue}/>);
  expect (getByTestId('grid')).toHaveTextContent("Word Boggle !!ABcdABcdABcdABcd");
});

it("matches snapshot",  () => {
  const tree = renderer.create(<Grid value = {boardValue} />).toJSON();
  expect(tree).toMatchSnapshot();
});
