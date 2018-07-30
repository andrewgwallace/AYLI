import React, { Component } from "react"
import { Button } from 'antd'
// import './SearchBox.css'

// const Search = Input.Search

class SearchBox extends Component {
  // state = {
  //   value: "",
  //   results: []
  // };
  state = {
    size: 'default'
  }
 
  onChange = (e) => { this.props.updateSearch(e.target.name, e.target.value) }
  
  getLocation = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(position => {
       (position.coords.latitude, position.coords.longitude)
    })
  }

  render() {
    // console.log(this.props.currentSearch)
    return (
      

      <Button onClick={this.props.submitSearch} type="primary" icon="compass" size={this.state.size}/>
      /* <Search className="SearchBox"
        type="text"
        name="search"
        value={this.props.currentSearch}
        enterButton
        onChange={this.onChange}
        placeholder="Enter an address or zipcode"
        onSearch={this.props.submitSearch}
      /> */
    );
  }
}

export default SearchBox