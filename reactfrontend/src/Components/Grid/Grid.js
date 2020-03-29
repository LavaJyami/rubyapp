import React, { Component } from 'react';
import Square from '../Square/Square';
import '../../App.css';

class Grid extends Component{
  render(){
    const listId = this.props.squareclassname;
    const data = this.props.value;
    let values = [];
    for(let i=0; i<data.length;i++){
      let j=i*(data.length-1);
      values[i] =
         <div className="row" key={i+j}>
            {data[i].map(n => {
              {j++};
              if(listId && listId.length>0){
                if(listId.includes(i+j))
                  return <Square className = "square_hilighted" key={i+j} value={n}/>
                else
                  return <Square className = "square" key={i+j} value={n}/>
              }
                  return <Square className = "square" key={i+j} value={n}/>

            })}
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
