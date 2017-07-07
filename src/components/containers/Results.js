import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchResults}  from '../../data/modules/searchResults'
import Product from '../presentational/Product'
import { Grid, Row, Col } from 'react-flexbox-grid'
import './Results.css';

const showLoader = isFetching => (isFetching && <p>loading...</p>)

const showResults = (results, isFetching) => (!isFetching && (
  <Grid fluid>
    <Row>
      {results.map(result => (
        <Col key={result.id} xs={6} sm={6} md={4} lg={3} >
          <Product product={result} />
        </Col>
      ))}
    </Row>
  </Grid>
))

class ResultsContainer extends Component {

  componentDidMount() {
    // TODO remove from here
    var parseQueryString = (str = "") => {
      let objURL = {};
      str.replace(
          new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
          function( $0, $1, $2, $3 ){
              objURL[ $1 ] = $3;
          }
      );
      return objURL;
    };

    const queries = parseQueryString(this.props.history.location.search);
    this.props.fetchResults(queries['q'])
  }

  render() {
    const {results, fetchResults, term} = this.props

    return (
      <div className="ResultsContainer">
        { showLoader(this.props.isFetching) }
        { showResults(this.props.results, this.props.isFetching) }
      </div>
    )
  }
}

ResultsContainer.propTypes = {
  results: PropTypes.array.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    results: state.searchResults.results,
    isFetching: state.searchResults.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: term => {
      dispatch(fetchResults(term))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
