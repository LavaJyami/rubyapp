import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import Wordlist from '../Wordlist/Wordlist';
import Score from '../Score/Score';
import { connect } from 'react-redux';

import {
        handleChange,
        resetWord,
        resetError,
        setError,
        validateWordAPI,
        resetApprovedWords,
        resetBoard,
        updateBoard,
        changeboarddim,
      } from '../../Actions/actions'


class GameBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      time: {},
      seconds: 90,
      score: 0,
    };

    this.handleChange = this.props.handleChange.bind(this);
    this.validateWord = this.validateWord.bind(this);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.countDown = this.countDown.bind(this);
    this.changeboarddim = this.changeboarddim.bind(this);
  }

  componentDidMount() {
    this.startGame(4);
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

  async startGame(boardDim) {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        content: parseInt(boardDim)
    };

    const fetchResponse = await fetch(`/api/v1/boards?Accept='application/json'&content=${boardDim}`);
    const data = await fetchResponse.json();
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.props.resetApprovedWords();
    this.props.updateBoard(data);
    this.setState({
      time: timeLeftVar
    });
    this.startTimer();
  }

  endGame(){
    let length = this.props.approvedwords.length;
    let totalScore = 0;
    if(length > 0){
      for(let i=0;i<length;i++){
        totalScore = totalScore + this.props.approvedwords[i].length;
      }
    }
    this.props.resetError();
    this.props.resetApprovedWords();
    this.props.resetBoard();
    this.setState({
      seconds: 90,
      });
  }

  playAgain(boardDim){
    this.endGame();
    clearInterval(this.timer);
    this.timer = 0;
    if(boardDim>3){
    this.startGame(boardDim);
  }
  else{
    this.startGame(this.props.boardim);
  }
  }


  validateWord(event){
    event.preventDefault();
    var payload = {};
    payload.word = event.target[0].value;
    payload.board = this.props.board;
    payload.approvedwords = this.props.approvedwords;
    this.props.validateWordAPI(payload);
  }

  changeboarddim(boardDim){
    this.props.changeboarddim(boardDim);
    this.playAgain(boardDim);
  }
  changeboarddimfive(boardDim){
    this.props.changeboarddim(boardDim);
    this.playAgain(boardDim);
  }

  render(){
    const {time} = this.state;
    const {board, squareclassname, error, approvedwords} = this.props;
        return(
      <div id="gameboard" >
            <div className = "boards">
                <div className = "section_first">
                    <Grid squareclassname = {squareclassname} value = {board}/>
                    <form id="input_box" onSubmit={event => {
                      this.validateWord(event)}}>
                        <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.props.word}
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
                        <button
                        onClick={()=>this.changeboarddim(4)}
                        >4 x 4
                        </button>
                        <button
                        onClick={()=>this.changeboarddimfive(5)}
                        >5 x 5
                        </button>
                    </div>
                </div>
                <div className = "section_second">
                    <div id="timer">
                        Time remaining: {time.m} : {time.s}
                    </div>
                    <Wordlist value = {approvedwords}/>
                    <Score words={approvedwords} />
                </div>
            </div>
      </div>


    );
  }
}

const mapStateToProps = state => ({
...state
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (payload) => dispatch(handleChange(payload)),
  resetWord: () => dispatch(resetWord()),
  resetError: () => dispatch(resetError()),
  setError: (payload) => dispatch(setError(payload)),
  validateWordAPI: (payload) => {dispatch(validateWordAPI(payload))},
  resetApprovedWords: ()=>dispatch(resetApprovedWords()),
  resetBoard: ()=>dispatch(resetBoard()),
  updateBoard: (payload)=>dispatch(updateBoard(payload)),
  changeboarddim: (payload)=>dispatch(changeboarddim(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps )(GameBoard);
