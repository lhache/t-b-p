import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchResults, storeSearchedTerm }  from '../../data/modules/searchResults'
import ResultsHeadline from '../presentational/ResultsHeadline'
import Product from '../presentational/Product'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { parseQueryString } from '../../data/utils'
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
    // set searchedTerm and fetch results at page load
    const queries = parseQueryString(this.props.history.location.search);
    const term = queries['q'];
    this.props.storeSearchedTerm(term)
    this.props.fetchResults(term)
  }

  componentWillReceiveProps(nextProps) {
    // set searchedTerm and fetch results after from submitted again
    if (this.props.searchedTerm !== '' && this.props.searchedTerm !== nextProps.searchedTerm) {
      const queries = parseQueryString(this.props.history.location.search);
      const term = queries['q'];
      this.props.storeSearchedTerm(term)
      this.props.fetchResults(term)
    }
  }

  render() {
    const {searchedTerm, results, fetchResults} = this.props

    return (
      <div className="ResultsContainer">
        <ResultsHeadline type="results" term={this.props.searchedTerm} />
        { showLoader(this.props.isFetching) }
        { showResults(this.props.results, this.props.isFetching) }
      </div>
    )
  }
}

ResultsContainer.propTypes = {
  searchedTerm : PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    searchedTerm: state.searchResults.searchedTerm,
    results: state.searchResults.results,
    isFetching: state.searchResults.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: term => {
      dispatch(fetchResults(term))
    },
    storeSearchedTerm: term => {
      dispatch(storeSearchedTerm(term))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
