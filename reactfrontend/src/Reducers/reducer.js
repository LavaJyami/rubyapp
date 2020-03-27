import {
  HANDLETEXTINPUT,
  RESETWORD,
  RESETERROR,
  SETERROR,
  SQUARECLASSNAME
 } from "../Actions/types";

const INITIAL_STATE = {
  word: '',
  error: '',
  squareclassname: [],
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
        case SQUARECLASSNAME:{
          console.log('from inside reducer');
          console.log(action.payload);
          console.log(action);
        return Object.assign({}, state, {
          squareclassname: action.payload
        })}
         default:
           return state;
     }
}

export default WBReducer;
