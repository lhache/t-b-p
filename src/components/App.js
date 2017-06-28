import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Home';
import Search from './Search';
import Details from './Details';;

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
