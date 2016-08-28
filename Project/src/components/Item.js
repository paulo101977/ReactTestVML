import React from 'react';
import {Link , RouteHandler}  from 'react-router';

class Item extends React.Component{ 
    
  constructor(props) {
    super(props);
  }
     
    
  render() {      
    return (
      <span className="text-center">
        <li>
            <Link params={{data:this.props.data}} className="btn btn-primary btn-block" to={`/repository/${this.props.data.name}`}>{this.props.data.name}</Link>
        </li>
    </span>
    );
  }
};

export default Item;
