
var _ = require('lodash');

import Item from './Item';
import React from 'react';



class MainContent extends React.Component{
  constructor(props){
      super(props);
      this.state = {data: []};
      this.props.data = [];
      var me = this;
      
      
    $.ajax({
      url: 'https://api.github.com/users/globocom/repos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        console.dir(data);
          
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
     
      
  }
    
    
  render() {
    var newdata = _.sortBy(this.state.data, 'stargazers_count', function(n) {
        return Math.sin(n);
    });
    
    //rever array
    newdata = newdata.reverse(); 
      
     
    return (
      <div>
          {newdata.map(function(data, index) {
            return (<Item  key={index} data={data}/>);
          })}
        </div>
    );
  }
}



export default MainContent;

