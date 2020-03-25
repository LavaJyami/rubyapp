import React, { Component } from 'react';
import Square from '../Square/Square';
import '../../App.css';

class Grid extends Component{
  render(){
    const data = this.props.value;
    let values = [];
    for(let i=0; i<data.length;i++){
              let j=i*3;
      values[i] =
         <div className="row" key={i+j}>
            {data[i].map(n => {
              {j++};
              return <Square key={i+j} value={n}/>})}
         </div>
    }
    return(
      <div data-testid = "grid">
        <h1>Word Boggle !!</h1>
        <div className="squarecontainer">
            {values}
        </div>
      </div>
    );
  }
}

export default Grid;
