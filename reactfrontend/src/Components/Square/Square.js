import React, { Component } from 'react';
import '../../App.css';

class Square extends Component {
  render(){
    var className = this.props.className;
    return(
      <div className={className} data-testid = "square">
        {this.props.value}
      </div>
    );
  }
}

export default Square;
