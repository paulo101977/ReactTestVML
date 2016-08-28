import React from 'react';

var _ = require('lodash');


function getNextItemAndUpdate(me , name){
   var url = 'https://api.github.com/repos/globocom/',     
        reponame =  name,
        urlCommit = url + reponame + '/commits',
        token = 'b5b5a3c3120c348b7b8b832a8136d12b7d33ee98'; 
            
      
      
    //commits  
    $.ajax({
      url: urlCommit + '?state=closed&access_token=' + token,
      dataType: 'json',
      cache: false,
      success: function(data) {
        
        var arr = [];
          
        me.state.index = 0;  
          
        _.forEach(data, function(value, key) {
          if(me.state.index < 20){
              arr.push(value);
              me.state.index++;
          }    
        });  
            
          
        me.setState({commits: arr , original: data , index: me.state.index});
      }.bind(me),
      error: function(xhr, status, err) {
      }.bind(me)
    }); 
}

class ItemLeft extends React.Component{ 
    
   constructor(props) {
       super(props);

       this.state = {commits: [] , original: [] , index: 0};

       this.getImg = this.getImg.bind(this);

       this.loadMore = this.loadMore.bind(this);       

       getNextItemAndUpdate(this , this.props.name);   
    }
    
  componentWillReceiveProps(nextProps){
      if(nextProps.name !== this.props.name){
          getNextItemAndUpdate(this , nextProps.name);
      }
  }    
   
  getImg(url){
      if(url) url = url.avatar_url;

      return url || 'https://avatars3.githubusercontent.com/u/83798?v=3&s=200';
  }   
    
  loadMore(){
      
      console.log('clicked');
      
      var index = this.state.index,
          arr = this.state.commits,
          data = this.state.original,
          me = this;;
      
      
      
      
      _.forEach(data, function(value, key) {
          if(me.state.index < index + 20){
              arr.push(value);
              me.state.index++;
          }    
      });
      
      me.setState({commits: arr , original: data , index: me.state.index});
  }    
    
  render() {   
    
    var me = this;
      
    return (
        <div className="row">
            <div className="col-md-10 col-md-offset-2">
                {this.state.commits.map(function(data, index){
                  return (
                      <blockquote>
                        <div className="media">
                          <div className="media-left">
                            <img className="media-object" src={me.getImg(data.author)} />
                          </div>
                          <div className="media-body">
                            <h4 className="media-heading">{data.commit.author.name}</h4>
                            <p>{data.commit.message}</p>
                          </div>
                        </div>
                        <footer>{data.commit.author.name}</footer>
                      </blockquote>
                    )
                })}
            </div>
            
            <div className="col-md-10 col-md-offset-2">
                { 
                    ((this.state.original.length - this.state.index) > 0) 
                        ? <button onClick={this.loadMore} className="btn btn-primary btn-info">Loading more</button> : <div></div>   
                }
            </div>
        </div>
            
        
    );
  }
};

export default ItemLeft;