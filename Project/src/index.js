import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import MainContent from './components/MainContent';
import { Router, Route, browserHistory} from 'react-router';
import Empty from './components/Empty';
import Left from './components/LeftContent';

// Render the main component into the dom
//ReactDOM.render(<MainContent />, document.getElementById('container'));

class App extends React.Component {
  render () {
    const { right, left } = this.props;
    return (
      <div className="container-fluid">
            <div className="jumbotron">
                <h1 className="title text-center">Test Api Github Globo.com</h1>
            </div>

            <div className="row">
                <div className="container">
                    <div className="col-xs-6 col-md-6 col-lg-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading"><h2>Globo Repository List</h2></div>
                            <div className="panel-body">    
                              <ul className="nav nav-pills nav-stacked">
                                  {right}
                              </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-6 col-md-6 col-lg-6">
                        {left}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" components={{right: MainContent , left: Empty}} />
      <Route path="/repository" components={{right: MainContent , left: Left}}>
        <Route path="/repository/:reposName" components={{right: MainContent , left: Left}}/>
      </Route>
      <Route path="*" components={{right: MainContent , left: Empty}}/>
    </Route>
  </Router>
, document.getElementById('container'));

