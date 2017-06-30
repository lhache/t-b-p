import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { browserHistory } from 'react-router'
import Home from './containers/Home';
import Search from './containers/Search';
import Details from './containers/Details';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/details">Details</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/search" component={Search}/>
            <Route path="/details" component={Details}/>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
