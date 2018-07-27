import React, { Component } from "react"

class SearchBox extends Component {
  state = {
    value: "",
    results: []
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {

    return (
      <form onSubmit={this.props.submitSearch}>
        <input
          type="text"
          name="address"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBox

