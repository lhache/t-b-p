import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Search from './Search'
import Results from './Results'
import Details from './Details'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'

import USP from '../presentational/USP'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <USP />

        <Route path="/" component={Search} />

        <Route path="/results" component={Results}/>

        <Route exact path="/details/:id" component={Details}/>

        <Footer />
      </div>
    );
  }
}

export default App;
