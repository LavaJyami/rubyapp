import {
  HANDLETEXTINPUT,
  RESETWORD,
  SETERROR,
  RESETERROR,
  SQUARECLASSNAME,
  WORDVALID,
  WORDINVALID,
  RESETAPPROVEDWORDS,
  RESETBOARD,
  UPDATEBOARD
} from './types';


export function handleChange(event){

  return {
        type: HANDLETEXTINPUT,
        text: event.target.value     // action payload
     }
}

export function resetWord(){
  return {
        type: RESETWORD,
     }
}

export function resetError(){
  return {
        type: RESETERROR,
     }
}

export function setError(text){
  return {
        type: SETERROR,
        text
     }
}


function hilightsquare(toHilight){
      if(toHilight && toHilight.length>0){
          return toHilight.map(e => arrayMapHelper(e));
        }
      else {
          return [];
      }
  }
function wordisValid(dispatch, word, toHilight){
dispatch ({
    type: WORDVALID,
    text: word,
    hilight: toHilight
  })
}
function wordisInValid(dispatch){
dispatch ({
    type: WORDINVALID,
  })
}
export function validateWordAPI(payload){

  return async dispatch => {
    // event.preventDefault();
    const word = payload.word;
    const approvedwords = payload.approvedwords;
    const board = payload.board;
        // hilightsquare();
      // const word = event.target[0].value;
      if(word){

          const key = 'dict.1.1.20200319T090129Z.8eb6b755e125a705.7fd9b9cb85a09a0dd9c47a86bb564c856893cafc';
          const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${word}`);
          const data = await response.json();
          if(data && data.def.length>0){
            console.log('validity result: from action');
            console.log(validate(word, board, approvedwords));
            const result = validate(word, board, approvedwords);
            if(result.validity) {
              const data = hilightsquare(result.toHilight);

              wordisValid(dispatch, word, data);
              // hilightsquare(dispatch, result.toHilight);
            }
            else
              wordisInValid(dispatch);
          }
          else
          wordisInValid(dispatch);
        }

      else {
        return{
          type: SETERROR,
          text: "enter a word!"
        }
      }
  }
}

export function resetApprovedWords(){
  return{
    type: RESETAPPROVEDWORDS
  }
}

function validate(word, board, approvedwords){
  const currentWord = word.toLowerCase();
  let payload = {};
  if(approvedwords.includes(currentWord))
    return false;
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++){
            if(board[i][j].toLowerCase() === currentWord[0]){
              const returnedResult = depthFirstSearch(i, j, board, currentWord);
              payload.toHilight = returnedResult.letters;
              payload.validity = returnedResult.foundVar;
            if(payload.validity){
              return payload;
            }
          }
        }
    }
  return false;
}

export function resetBoard(){
  return{
    type:RESETBOARD
  }
}

export function updateBoard(data){
  return{
    type:UPDATEBOARD,
    data
  }
}



const arrayMapHelper = (e) => {
const i=e[0];
const j=e[1];
if(i===0 && j===0)
return 1;
if(i===0 && j===1)
return 2;
if(i===0 && j===2)
return 3;
if(i===0 && j===3)
return 4;
if(i===1 && j===0)
return 5;
if(i===1 && j===1)
return 6;
if(i===1 && j===2)
return 7;
if(i===1 && j===3)
return 8;
if(i===2 && j===0)
return 9;
if(i===2 && j===1)
return 10;
if(i===2 && j===2)
return 11;
if(i===2 && j===3)
return 12;
if(i===3 && j===0)
return 13;
if(i===3 && j===1)
return 14;
if(i===3 && j===2)
return 15;
if(i===3 && j===3)
return 16;
}




//DFS Functions
//------------------------------------------------------


 const isOutOfBounds = (i, j, boardDim, direction) =>{
    if(direction === 'tp' && i-1<0)
        return true;
    else if(direction === 'tr' && (i-1<0 || j+1>boardDim))
        return true;
    else if(direction === 'rt' &&  j+1>boardDim)
        return true;
    else if(direction === 'br' && (i+1>boardDim || j+1>boardDim))
        return true;
    else if(direction === 'bt' && i+1>boardDim)
        return true;
    else if(direction === 'bl' && (i+1>boardDim || j-1<0))
        return true;
    else if(direction === 'lt' && j-1<0)
        return true;
    else if(direction === 'tl' && (i-1<0 || j-1<0))
        return true;
    else
        return false;
}

 const depthFirstSearch = (i, j, board, word) => {
let stack = [];
let approvedLetters = [[i,j]];
const wordLength = word.length;
const boardDim = board.length;
let k = 1;
let value = [];
let foundFlag  = false;
let lettersFound = 0;
let unchecked_branch = 0;
let returnValue = {};

while(k<=wordLength){
    if(!isOutOfBounds(i,j,boardDim-1,'tp') && !isRepeated(approvedLetters,i-1,j) && board[i-1][j].toLowerCase()===word[k]){
    stack.push([i-1,j]); foundFlag = true; lettersFound++;
    }
    if(!isOutOfBounds(i,j,boardDim-1,'tr') && !isRepeated(approvedLetters,i-1,j+1) && board[i-1][j+1].toLowerCase()===word[k]){
    stack.push([i-1,j+1]);  foundFlag = true; lettersFound++;
    }
    if(!isOutOfBounds(i,j,boardDim-1,'rt') && !isRepeated(approvedLetters,i,j+1) && board[i][j+1].toLowerCase()===word[k]){
    stack.push([i,j+1]);  foundFlag = true; lettersFound++;
    }
    if(!isOutOfBounds(i,j,boardDim-1,'br') && !isRepeated(approvedLetters,i+1,j+1) && board[i+1][j+1].toLowerCase()===word[k]){
    stack.push([i+1,j+1]); foundFlag = true; lettersFound++;
    }
    if(!isOutOfBounds(i,j,boardDim-1,'bt') && !isRepeated(approvedLetters,i+1,j) && board[i+1][j].toLowerCase()===word[k]){
    stack.push([i+1,j]);  foundFlag = true; lettersFound++;
    }
    if(!isOutOfBounds(i,j,boardDim-1,'bl') && !isRepeated(approvedLetters,i+1,j-1) && board[i+1][j-1].toLowerCase()===word[k]){
    stack.push([i+1,j-1]); foundFlag = true; lettersFound++;
    }
    if(!isOutOfBounds(i,j,boardDim-1,'lt') && !isRepeated(approvedLetters,i,j-1) && board[i][j-1].toLowerCase()===word[k]){
    stack.push([i,j-1]); foundFlag = true; lettersFound++;
    }
    if(!isOutOfBounds(i,j,boardDim-1,'tl') && !isRepeated(approvedLetters,i-1,j-1) && board[i-1][j-1].toLowerCase()===word[k]){
    stack.push([i-1,j-1]); foundFlag = true; lettersFound++;
    }

    if(!foundFlag && stack.length === 0) {
        return {
        foundVar: false,
        letters: []
      }
    }

    if(foundFlag && lettersFound === 1){
        k++;
        value = stack.pop();i = value[0]; j = value[1]; foundFlag=false; lettersFound = 0;
        approvedLetters.push(value);
        if(k === wordLength){
          returnValue.foundVar = true;
          returnValue.letters = approvedLetters;
          return returnValue;
        }
    }

    else if(foundFlag && lettersFound> 1){
        unchecked_branch = k+1;
        k++;
        value = stack.pop();i = value[0]; j = value[1]; foundFlag=false; lettersFound = 0;
        approvedLetters.push(value);
        if(k === wordLength){
          returnValue.foundVar = true;
          returnValue.letters = approvedLetters;
          return returnValue;
        }
    }

    else if(!foundFlag && stack.length>0){
        k = unchecked_branch;
        const number_of_items_to_backtrack = approvedLetters.length - (k-1);
        for(let l=0;l<number_of_items_to_backtrack;l++){
            approvedLetters.pop();
        }
        value = stack.pop();i = value[0]; j = value[1]; lettersFound = 0;
        approvedLetters.push(value);
    }

  }
}

 const isRepeated = (visited,i,j) => {
    for(let k=0; k<visited.length;k++){
        if(visited[k][0]===i && visited[k][1]===j ){
            return true;
        }
    }
    return false;
}
