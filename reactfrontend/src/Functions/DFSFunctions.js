
export const isOutOfBounds = (i, j, boardDim, direction) =>{
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

export const depthFirstSearch = (i, j, board, word) => {
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
        return false;
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

export const isRepeated = (visited,i,j) => {
    for(let k=0; k<visited.length;k++){
        if(visited[k][0]===i && visited[k][1]===j ){
            return true;
        }
    }
    return false;
}
