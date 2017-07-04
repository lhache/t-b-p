import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Translate from 'react-translate-component'
import { Route } from 'react-router-dom'
import './App.css';
import Search from './Search'
import Results from './Results'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        {/* TODO change that and merge search and results reducers */}
        <Route path="/" component={Search}/>

        <Route path="/results" component={Results}/>

        <Footer />
      </div>
    );
  }
}

export default App;
