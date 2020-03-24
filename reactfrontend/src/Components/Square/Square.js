import React, { Component } from 'react';
import '../../App.css';

class Square extends Component {
  render(){
    return(
      <div className="square" data-testid = "square">
        {this.props.value}
      </div>
    );
  }
}

export default Square;
