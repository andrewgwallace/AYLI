import React, { Component } from "react"

class SearchBox extends Component {

  state = {
    value: ''
  }

onSubmit = (e) => {
  console.log(`You are going to search for ${this.state.value}`)
  e.preventDefault();
}

handleChange = (e) => {
  this.setState({ value: e.target.value });
}

render() {
  return <form onSubmit={this.onSubmit}>
    <input type="text" name="address" value={this.state.value} onChange={this.handleChange}/> 
      <button type="submit">Search</button>
    </form>;
}

}

export default SearchBox

