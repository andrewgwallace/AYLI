import React, { Component } from "react"

class SearchBox extends Component {
  // state = {
  //   value: "",
  //   results: []
  // };
 
  onChange = (e) => { this.props.updateSearch(e.target.name, e.target.value) }
  

  render() {
    console.log(this.props.currentSearch)
    return (
      <form onSubmit={this.props.submitSearch}>
        <input
          type="text"
          name="search"
          value={this.props.currentSearch}
          onChange={this.onChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBox

