import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import Wordlist from '../Wordlist/Wordlist';
import Score from '../Score/Score';

class GameBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      word: '',
      approvedWords: [],
      error: '',
      board: [...Array(4)].map(lt => Array(4)),
      time: {},
      seconds: 300,
      score: 0,
      validityData: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateWordAPI = this.validateWordAPI.bind(this);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.countDown = this.countDown.bind(this);

  }

  componentDidMount() {
    this.startGame();
    //api test
    this.testing();
  }

  testing(){
    this.validateWordAPI_test("test");
  }

  handleChange(event){
    this.setState({
      word: event.target.value,
      error: ''
    });
  }

  isRepeated(visited,i,j){
    for(let k=0; k<visited.length;k++){
      if(visited[k][0]===i && visited[k][1]===j ){
        return true;
      }
    }
    return false;
  }

  isOutOfBounds(i, j, boardDim, direction){
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

  async validateWordAPI_test(word){
    if(word){
        const key = 'dict.1.1.20200319T090129Z.8eb6b755e125a705.7fd9b9cb85a09a0dd9c47a86bb564c856893cafc';
        const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${word}`);
        const data = await response.json();
        if(data){
          if(this.validate(word) === true ) {
              this.setState({error: ''});
              this.setState(previousState => ({
              approvedWords: [...previousState.approvedWords, word]}));
              this.setState({word: ''});
          }
          else {
              this.setState({error: ''});
              this.setState({word: ''});
          }
        }
        else {
            this.setState({error: 'invalid!!'});
            this.setState({word: ''});
        }
  }
  else {
    this.setState({error: 'enter a word!'});
  }
  }

  async validateWordAPI(event){
    event.preventDefault();
    const word = event.target[0].value;
    if(word){
        const key = 'dict.1.1.20200319T090129Z.8eb6b755e125a705.7fd9b9cb85a09a0dd9c47a86bb564c856893cafc';
        const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${word}`);
        const data = await response.json();
        console.log('API: ');
        console.log(data && data.def.length>0);
        if(data && data.def.length>0){
          if(this.validate(word) === true ) {
              this.setState({error: ''});
              this.setState(previousState => ({
              approvedWords: [...previousState.approvedWords, word]}));
              this.setState({word: ''});
          }
          else {
              this.setState({error: 'invalid!!'});
              this.setState({word: ''});
          }
        }
        else {
            this.setState({error: 'invalid!!'});
            this.setState({word: ''});
        }
  }
  else {
    this.setState({error: 'enter a word!'});
  }
  }

  validate(word){
    const board = this.state.board;
    const currentWord = word.toLowerCase();

    if(this.state.approvedWords.includes(currentWord))
      return false;
      for(let i=0;i<board.length;i++){
          for(let j=0;j<board[0].length;j++){
              if(board[i][j].toLowerCase() === currentWord[0]){
                console.log('result of dfs');
                console.log(this.depthFirstSearch(i,j,board,currentWord));
              if(this.depthFirstSearch(i, j, board, currentWord))
              return true;
            }
          }
      }
    return false;
  }

  depthFirstSearch(i, j, board, word){
    let stack = [];
    let approvedLetters = [[i,j]];
    const wordLength = word.length;
    const boardDim = board.length;
    let k = 1;
    let value = [];
    let foundFlag  = false;
    let lettersFound = 0;
    let unchecked_branch = 0;

    while(k<=wordLength){
      if(!this.isOutOfBounds(i,j,boardDim-1,'tp') && !this.isRepeated(approvedLetters,i-1,j) && board[i-1][j].toLowerCase()===word[k]){
        stack.push([i-1,j]); foundFlag = true; lettersFound++; console.log('found in tp');
      }
      if(!this.isOutOfBounds(i,j,boardDim-1,'tr') && !this.isRepeated(approvedLetters,i-1,j+1) && board[i-1][j+1].toLowerCase()===word[k]){
        stack.push([i-1,j+1]);  foundFlag = true; lettersFound++; console.log('found in tr');
      }
      if(!this.isOutOfBounds(i,j,boardDim-1,'rt') && !this.isRepeated(approvedLetters,i,j+1) && board[i][j+1].toLowerCase()===word[k]){
        stack.push([i,j+1]);  foundFlag = true; lettersFound++; console.log('found in rt');
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'br') && !this.isRepeated(approvedLetters,i+1,j+1) && board[i+1][j+1].toLowerCase()===word[k]){
        stack.push([i+1,j+1]); foundFlag = true; lettersFound++; console.log('found in br');
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'bt') && !this.isRepeated(approvedLetters,i+1,j) && board[i+1][j].toLowerCase()===word[k]){
        stack.push([i+1,j]);  foundFlag = true; lettersFound++; console.log('found in bt');
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'bl') && !this.isRepeated(approvedLetters,i+1,j-1) && board[i+1][j-1].toLowerCase()===word[k]){
        stack.push([i+1,j-1]); foundFlag = true; lettersFound++; console.log('found in bl');
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'lt') && !this.isRepeated(approvedLetters,i,j-1) && board[i][j-1].toLowerCase()===word[k]){
        stack.push([i,j-1]); foundFlag = true; lettersFound++; console.log('found in lt');
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'tl') && !this.isRepeated(approvedLetters,i-1,j-1) && board[i-1][j-1].toLowerCase()===word[k]){
        stack.push([i-1,j-1]); foundFlag = true; lettersFound++; console.log('found in tl');
        }

        if(!foundFlag && stack.length === 0) {
            return false;
        }
        if(foundFlag && lettersFound === 1){
            k++;
            if(k === wordLength)
            return true;
            value = stack.pop();i = value[0]; j = value[1]; foundFlag=false; lettersFound = 0;

            approvedLetters.push(value);
            console.log(approvedLetters);
            for(let x=0; x<approvedLetters.length; x++){
              let a = approvedLetters[x][0];
              let b = approvedLetters[x][1];
              console.log(board[a][b]);
            }
        }
         else if(foundFlag && lettersFound> 1){
            unchecked_branch = k+1;
            k++;
            if(k === wordLength)
            return true;
            value = stack.pop();i = value[0]; j = value[1]; foundFlag=false; lettersFound = 0;
            approvedLetters.push(value);
            console.log(approvedLetters);
            for(let x=0; x<approvedLetters.length; x++){
              let a = approvedLetters[x][0];
              let b = approvedLetters[x][1];
              console.log(board[a][b]);
            }
            console.log('value of k (found multiple): '+ k);

        }
         else if(!foundFlag && stack.length>0){
            k = unchecked_branch;
            const number_of_items_to_backtrack = approvedLetters.length - (k-1);
            console.log('unchecked branch');
            console.log('---------------------------------------');
            console.log(approvedLetters);
            for(let x=0; x<approvedLetters.length; x++){
              let a = approvedLetters[x][0];
              let b = approvedLetters[x][1];
              console.log(board[a][b]);
            }
            for(let l=0;l<number_of_items_to_backtrack;l++){
              approvedLetters.pop();
            }
            value = stack.pop();i = value[0]; j = value[1]; lettersFound = 0;
            approvedLetters.push(value);
            console.log(approvedLetters);
            for(let x=0; x<approvedLetters.length; x++){
              let a = approvedLetters[x][0];
              let b = approvedLetters[x][1];
              console.log(board[a][b]);
            }
            console.log('value of k back_tracking: '+ k);

        }
      }
  }

  secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    if (seconds === 0) {
      this.endGame();
      clearInterval(this.timer);
      this.timer = 0;
    }
  }

  async startGame() {
    const response = await fetch('/api/v1/boards');
    const data = await response.json();
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({
      board: data,
      approvedWords: [],
      time: timeLeftVar
    });
    this.startTimer();
  }

  endGame(){
    let length = this.state.approvedWords.length;
    let totalScore = 0;
    if(length > 0){
      for(let i=0;i<length;i++){
        totalScore = totalScore + this.state.approvedWords[i].length;
      }
      alert('Your Score is: ' + totalScore) ;
    }
    else
    alert('Your Score is: ' + 0) ;
    this.setState({
      board: [['','','',''],['','','',''],['','','',''],['','','','']],
      approvedWords: [],
      seconds: 300,
      error: ''
      });
  }

  playAgain(){
    this.endGame();
    clearInterval(this.timer);
    this.timer = 0;
    this.startGame();
  }

  render(){
    const {word, approvedWords, error, board, time} = this.state;
    return(
      <div id="gameboard" >
            <div className = "boards">
                <div className = "section_first">
                    <Grid value = {board}/>
                    <form id="input_box" onSubmit={this.validateWordAPI}>
                        <input
                        type="text"
                        onChange={this.handleChange}
                        value={word}
                        placeholder="enter word"
                        />
                        <input
                        className = "addButton"
                        type="submit"
                        value="Add +"
                        />
                    </form>
                    <p className = "error">{error}</p>
                    <div className = "playAgain">
                        <button
                        onClick={this.playAgain}
                        >Play Next >>
                        </button>
                    </div>
                </div>
                <div className = "section_second">
                    <div id="timer">
                        Time remaining: {time.m} : {time.s}
                    </div>
                    <Wordlist value = {approvedWords}/>
                    <Score words={approvedWords} />
                </div>
            </div>
      </div>


    );
  }
}

export default GameBoard;
