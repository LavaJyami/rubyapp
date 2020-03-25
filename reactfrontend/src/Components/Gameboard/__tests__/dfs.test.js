import React from 'react';
import ReactDOM from 'react-dom';
import { depthFirstSearch } from '../../../Functions/DFSFunctions';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

const board = [ ["x","s","o","e"],
                ["f","m","r","t"],
                ["y","o","y","u"],
                ["e","g","q","y"] ];
                
afterEach(cleanup);


it("DFS",()=>{
  expect(depthFirstSearch(0,1,board,"sore")).toBeTruthy();
  expect(depthFirstSearch(1,3,board,"tore")).toBeTruthy();
  expect(depthFirstSearch(2,0,board,"yegom")).toBeTruthy();
  expect(depthFirstSearch(0,0,board,"xsoetuyqgeyfmryo")).toBeTruthy();
  expect(depthFirstSearch(0,0,board,"xsoetuyqgeyfmryy")).toBeFalsy();
  expect(depthFirstSearch(1,2,board,"roef")).toBeFalsy();
  expect(depthFirstSearch(1,2,board,"rosm")).toBeTruthy();
  expect(depthFirstSearch(1,2,board,"roms")).toBeTruthy();
});
