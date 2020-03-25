import React from 'react';
import ReactDOM from 'react-dom';
import { isOutOfBounds } from '../../../Functions/DFSFunctions';

import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

const boardDim = 4;
afterEach(cleanup);

it("out of bounds for 0,0 in the board tests",()=>{
  expect(isOutOfBounds(0,0,boardDim,'tp')).toBeTruthy();
  expect(isOutOfBounds(0,0,boardDim,'tr')).toBeTruthy();
  expect(isOutOfBounds(0,0,boardDim,'rt')).toBeFalsy();
  expect(isOutOfBounds(0,0,boardDim,'br')).toBeFalsy();
  expect(isOutOfBounds(0,0,boardDim,'bt')).toBeFalsy();
  expect(isOutOfBounds(0,0,boardDim,'bl')).toBeTruthy();
  expect(isOutOfBounds(0,0,boardDim,'lt')).toBeTruthy();
  expect(isOutOfBounds(0,0,boardDim,'tl')).toBeTruthy();
});
