import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Translate from 'react-translate-component'
import './Home.css';
import Search from './Search'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Toy project</h1>
        <Translate content="title" />

        <Search/>
      </div>
    );
  }
}

export default Home;
