import React, { Component } from "react"
import { Button } from 'antd'
// import './SearchButton.css'

// const Search = Input.Search

class SearchButton extends Component {
  // state = {
  //   value: "",
  //   results: []
  // };
  state = {
    size: 'large'
  }
 
  

  onChange = (e) => { this.props.updateSearch(e.target.name, e.target.value) }
  
  getLocation = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(position => {
       (position.coords.latitude, position.coords.longitude)
    })
  }

  render() {
    return (
      <Button onClick={this.props.submitSearch} type="primary" icon="compass" size={this.state.size}>Find a Performer!</Button>
    );
  }
}

export default SearchButton