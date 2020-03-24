import React, { Component } from 'react';
import Square from '../Square/Square';
import '../../App.css';

class Grid extends Component{
  render(){
    const data = this.props.value;
    return(
      <div data-testid = "grid">
        <h1>Word Boggle !!</h1>
        <div className="squarecontainer">
          <div className="row">
          {data[0].map((n,i)=> {
            return <Square key={i} value={n}/>
          })}
          </div>
          <div className="row">
          {data[1].map((n,i) => {
            return <Square key={i} value={n}/>
          })}
          </div>
          <div className="row">
          {data[2].map((n,i) => {
            return <Square key={i} value={n}/>
          })}
          </div>
          <div className="row">
          {data[3].map((n,i) => {
            return <Square key={i} value={n}/>
          })}
          </div>
        </div>
      </div>
    );
  }

}

export default Grid;
