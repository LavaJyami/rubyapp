import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import Wordlist from '../Wordlist/Wordlist';
import Score from '../Score/Score';

import {  depthFirstSearch,
          isRepeated,
          isOutOfBounds
        } from '../../Functions/DFSFunctions';

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
  }

  handleChange(event){
    this.setState({
      word: event.target.value,
      error: ''
    });
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
              if(depthFirstSearch(i, j, board, currentWord))
              return true;
            }
          }
      }
    return false;
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
      board: [...Array(4)].map(lt => Array(4)),
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
                        data-testid = "addbutton"
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
