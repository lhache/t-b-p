import React, { Component } from 'react';
import ReactTags from 'react-tag-autocomplete'
import './TagAutocomplete.css'

class TagAutocomplete extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tags: [],
      suggestions: [
        { name: "Green toy" },
        { name: "Sustainable" },
        { name: "Educational" },
        { name: "For 3 years old" },
        { name: "For 4 years old" },
        { name: "For 5 years old" }
      ]
    }
  }

  handleDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }

  render () {
    return (
      <ReactTags
        placeholder="Search for toys"
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)}
        minQueryLength={1}
      />
    )
  }
}

export default TagAutocomplete
