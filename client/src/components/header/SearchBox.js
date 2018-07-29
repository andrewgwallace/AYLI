import React, { Component } from "react"
import { Input } from 'antd'
// import './SearchBox.css'

const Search = Input.Search

class SearchBox extends Component {
  // state = {
  //   value: "",
  //   results: []
  // };
 
  onChange = (e) => { this.props.updateSearch(e.target.name, e.target.value) }
  

  render() {
    // console.log(this.props.currentSearch)
    return (
      <Search className="SearchBox"
        type="text"
        name="search"
        value={this.props.currentSearch}
        enterButton
        onChange={this.onChange}
        placeholder="Enter an address or zipcode"
        onSearch={this.props.submitSearch}
      />
    );
  }
}

export default SearchBox

