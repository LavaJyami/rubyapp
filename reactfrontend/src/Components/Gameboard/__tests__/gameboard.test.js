import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from '../Gameboard';

import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

afterEach(cleanup);

it("game renders without crashing",() => {
  const div = document.createElement("div");
  ReactDOM.render(<Gameboard />, div);
})
