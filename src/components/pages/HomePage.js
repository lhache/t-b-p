import React, { Component } from 'react';
import Search from '../containers/Search'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
import USP from '../presentational/USP'
// import './HomePage.css'


class HomePage extends Component {

  render() {
    return (
      <div className="HomePageContainer">
        <div className="HeaderBackground">
            <Header />
            <Search />
            <USP />
        </div>

        {/* <Results /> */}
        <Footer />
      </div>
    )
  }
}

export default HomePage;
