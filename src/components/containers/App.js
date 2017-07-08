import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Search from './Search'
import Results from './Results'
import Details from './Details'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
import { Grid, Row, Col } from 'react-flexbox-grid'

import USP from '../presentational/USP'

class App extends Component {
  render() {
    return (
      <Grid fluid className="App AppFluid">
        <Header />
        <USP />

        <Route path="/" component={Search} />

        <Route path="/results" component={Results}/>

        <Route exact path="/details/:id" component={Details}/>

        <Footer />
      </Grid>
    );
  }
}

export default App;
