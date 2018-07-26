import React, { Component } from "react"
import axios from 'axios'

class SearchBox extends Component {
  state = {
    value: ""
  };

  onSubmit = e => {
    const baseURL = "http://localhost:3004"
    e.preventDefault();
    const search = encodeURI(this.state.value);
    axios.get(`${baseURL}/search?s=${search}`)
    .then(response => {
      console.log(response.data[0].lat);
      // if (data) {
      //   console.log(data)
      // }
    })
    .catch(error => {
      console.log(error)
    })
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {

    return (
      <form onSubmit={this.onSubmit}>
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

