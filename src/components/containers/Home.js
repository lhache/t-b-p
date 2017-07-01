import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Home.css';
import Search from './Search'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <ul>
          {/* <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/details">Details</Link></li> */}
        </ul>

        <Search/>
      </div>
    );
  }
}

export default Home;
