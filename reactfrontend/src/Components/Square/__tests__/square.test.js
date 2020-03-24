import React from 'react';
import ReactDOM from 'react-dom';
import Square from '../Square';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("Mainboard renders without crashing",() => {
  const div = document.createElement("div");
  ReactDOM.render(<Square value={"A"} />, div);
});


it("Letters in the square component are rendered correctly",() => {
  const {getByTestId} = render(<Square value = {"A"}/>);
  expect (getByTestId('square')).toHaveTextContent("A");
});
