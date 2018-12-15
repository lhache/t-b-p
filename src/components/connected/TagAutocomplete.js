import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { buildUrl, getCategoryKey, isDeviceConsideredMobile } from '../../utils/appUtils'
import counterpart from 'counterpart'
// import './TagAutocomplete.css'
// import 'react-select/dist/react-select.css';
import _isArray from 'lodash/isArray'
import _truncate from 'lodash/truncate'
import AsyncSelect from 'react-select/lib/Async';

const styles = {
  control: (base) => ({ ...base, borderRadius: '0', border: '1px solid #00cbe2', minHeight: '50px' }),
  container: (base) => ({ ...base, width: '100%' }),
  input: (base) => ({ ...base, width: '100%', borderRadius: '0' }),
  menu: (base) => ({ ...base, margin: '0', borderRadius: '0 0 4px 4px' })
}

class TagAutocompleteContainer extends Component {

  state = {
    menuIsOpen: false,
    value: '',
    inputValue: ''
  }

  componentDidMout() {
      this.setState({ value: this.props.term })
  }

  getOptions = (input) => {
      let queryParams = {}

      if(!_isArray(input)) {
          if (input) {
              queryParams = Object.assign({}, queryParams, {q: input})
          }
      }

      const url = buildUrl(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_SUGGEST_ENDPOINT}`,
        queryParams
      )


      return fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          const options = json.map(result => Object.assign({}, result, {
              name: _truncate(result.name, { length: isDeviceConsideredMobile() ? 35 : 80 } )
            })
          )
          return options
        })
  }

  onKeyChange = (e) => {
    switch (e.keyCode) {
        case 13: // ENTER
            e.preventDefault()
            this.props.onSubmit(e.target.value)
            break;
        default:
          console.log('on key chabge')
          console.log('e target val', e.target.value)
          this.setState({ value: e.target.value, inputValue: e.target.value })
          // this.props.onChange(e.target.value)
          break;
        }
  }

  // this is when the value of the input changes
  onInputChange = (newValue, actionMeta) => {
    //  action: 'set-value' | 'input-change' | 'input-blur' | 'menu-close';
    // debugger
    if (actionMeta === 'input-blur') {
      debugger
    }
    if (actionMeta === 'input-change') {
      console.log('on input chabge')
        this.setState({ value: newValue, inputValue: newValue })
        if (newValue !== "" && newValue.length > 2) {
            this.props.onChange(this.state.value)
        }
    }
  }

  // this is when selecting a product in the list
  onChange = (newValue, actionMeta) => {
    // {
    //   action: 'select-option' |
    //     'deselect-option' |
    //     'remove-value' |
    //     'pop-value' |
    //     'set-value' |
    //     'clear' |
    //     'create-option';
    // }
    debugger
    this.props.onSelectItem(newValue)
  }

  onBlur = (value) => {
    // this.setState({ value, inputValue: value })
    // this.props.onChange(e.target.value)
  }

  render () {
    return (
        <AsyncSelect
            styles={styles}
            value={this.state.value}
            onChange={this.onChange}
            // inputValue={this.state.inputValue}
            onInputChange={this.onInputChange}
            onKeyDown={ this.onKeyChange }
            onBlur={ this.onBlur }
            menuIsOpen={this.state.menuIsOpen}
            onMenuOpen={() => this.setState({ menuIsOpen: true })}
            onMenuClose={() => this.setState({ menuIsOpen: false })}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            noOptionsMessage={ () => counterpart('search.noResultsFound') }
            placeholder={counterpart('search.placeholder')}
            loadingMessage={ () => counterpart('search.loadingPlaceholder')}
            menuShouldScrollIntoView={ true } // ???
            multi={false}
            name="searchform-tags"
            loadOptions={this.getOptions }
            blurInputOnSelect={false}
        />
    )
  }
}


TagAutocompleteContainer.propTypes = {
  term: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    term: state.term.term
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     storeAge: age => dispatch(storeAge(age)),
//     fetchResults: (term, categories, offset) => dispatch(fetchResults(term, categories, offset)),
//     resetResults: () => dispatch(resetResults())
//   }
// }

const TagAutocomplete = withRouter(connect(mapStateToProps)(TagAutocompleteContainer))

export default TagAutocomplete;
