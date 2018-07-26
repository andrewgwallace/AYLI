import React, { Component } from "react"
import axios from 'axios'

class SearchBox extends Component {
  state = {
    value: "",
    results: []
  };

  onSubmit = e => {
    const baseURL = "http://localhost:3004"
    e.preventDefault();
    const search = encodeURI(this.state.value);
    axios.get(`${baseURL}/search?s=${search}`)
    .then(response => {
      const data = response.data.map(result => {
       return {"lat": result.lat, lon: result.lon, boundingbox: result.boundingbox}
      })
      this.setState({
        results: data
      })
    })
    .then(() => {
      console.log(this.state.results)
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

