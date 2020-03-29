import {
  HANDLETEXTINPUT,
  RESETWORD,
  RESETERROR,
  SETERROR,
  SQUARECLASSNAME,
  WORDVALID,
  WORDINVALID,
  RESETAPPROVEDWORDS,
  UPDATEBOARD,
  RESETBOARD,
  CHANGEBOARDDIMFOUR,
  CHANGEBOARDDIMFIVE
 } from "../Actions/types";

const INITIAL_STATE = {
  word: '',
  error: '',
  squareclassname: [],
  approvedwords: [],
  board: [...Array(4).fill(" ")].map(lt => Array(4).fill(" ")),
  boardim: 4
};

function WBReducer(state = INITIAL_STATE, action){
    switch(action.type) {
        case HANDLETEXTINPUT:
        return Object.assign({}, state, {
          word: action.word,
          error: '',
          squareclassname: []
        })
        case RESETWORD:
        return Object.assign({}, state, {
          word: ' '
        })
        case RESETERROR:
        return Object.assign({}, state, {
          error: '',
        })
        case SETERROR:
        return Object.assign({}, state, {
          error: action.text
        })
        case SQUARECLASSNAME:
        return Object.assign({}, state, {
          squareclassname: action.payload
        })
        case WORDVALID:
        return Object.assign({},state,{
          word: '',
          error: '',
          approvedwords: [...state.approvedwords, action.text],
          squareclassname: action.hilight
        })
        case WORDINVALID:
        return Object.assign({},state,{
          word: '',
          error: 'invalid !!',
        })
        case UPDATEBOARD:
        return Object.assign({},state,{
          board: action.data
        })
        case RESETBOARD:
        return Object.assign({},state,{
          board:  [...Array(4).fill(" ")].map(lt => Array(4).fill(" "))
        })
        case CHANGEBOARDDIMFOUR:
        return Object.assign({},state,{
          boardim: parseInt(action.dim)
        })
        case CHANGEBOARDDIMFIVE:
        return Object.assign({},state,{
          boardim: 5
        })
         default:
           return state;
     }
}

export default WBReducer;
