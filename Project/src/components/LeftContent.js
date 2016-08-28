import React from 'react';

import ItemLeft from './ItemLeftContent';

var _ = require('lodash');


function getDataAndUpdate(me , name){
    
      var token = 'b5b5a3c3120c348b7b8b832a8136d12b7d33ee98',
          url = 'https://api.github.com/repos/globocom/',
          reponame =  name,
          urlCommit = url + reponame + '/commits',
          urlRepos = 'https://api.github.com/repos/globocom/' + reponame;

        //repository  
        $.ajax({
              url: urlRepos + '?state=closed&access_token=' + token,
              dataType: 'json',
              cache: false,
              success: function(data) {
                me.setState({repos: data});
                //console.dir(data);

                me.forceUpdate(); //test rerender  
              }.bind(me),
              error: function(xhr, status, err) {
              }.bind(me)
        });
}

class Left extends React.Component{
  
  constructor(props){
      super(props);
      this.state = { repos: {}};
      
      getDataAndUpdate(this , this.props.params.reposName);
  } 
    
  componentDidMount() {
      
  }  
    
  componentWillReceiveProps(nextProps){
      getDataAndUpdate(this , nextProps.params.reposName);    
  }    
      
  render() { 
    return (
      <div className="panel panel-default" ng-show="repo.name">
        <div className="panel-heading"><h2>Repository Info</h2></div>

        <div className="panel-body">
            <h3>Name: {this.props.params.reposName}</h3>
            <div className="row">
                <div className="col-md-6">
                    <div type="button" className="btn btn-primary btn-info">Stars: 
                        <i className="glyphicon glyphicon-star star"></i>
                        <span className="badge">{this.state.repos.stargazers_count} Stars</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div type="button" className="btn btn-primary btn-info">Forks: 
                        <span className="badge">{this.state.repos.forks} Forks</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2"><h4>Commits: </h4></div>
            </div>

            <ItemLeft name={this.props.params.reposName} />
        </div>
    </div>
    );
  }
};

export default Left;