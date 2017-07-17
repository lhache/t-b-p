import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import DetailsPage from '../pages/DetailsPage'
import HomePage from '../pages/HomePage'
import ResultsPage from '../pages/ResultsPage'
import LandingPage from '../pages/LandingPage'
import { Grid } from 'react-flexbox-grid'



class App extends Component {
  render() {
    return (
      <Grid fluid className="App AppFluid">

        <Route exact path="/" component={HomePage} />

        <Route path="/results" component={ResultsPage}/>

        <Route path="/details/:id" component={DetailsPage}/>

        <Route path="/landing" component={LandingPage}/>

      </Grid>
    );
  }
}

export default App;
