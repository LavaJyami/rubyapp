import {
  HANDLETEXTINPUT,
  RESETWORD,
  RESETERROR,
  SETERROR
 } from "../Actions/types";

const INITIAL_STATE = {
  word: '',
  error: ''
};

function WBReducer(state = INITIAL_STATE, action){
    switch(action.type) {
        case HANDLETEXTINPUT:
        return Object.assign({}, state, {
          word: action.word
        })
        case RESETWORD:
        return Object.assign({}, state, {
          word: ''
        })
        case RESETERROR:
        return Object.assign({}, state, {
          error: ''
        })
        case SETERROR:
        return Object.assign({}, state, {
          error: action.text
        })
         default:
           return state;
     }
}

export default WBReducer;
