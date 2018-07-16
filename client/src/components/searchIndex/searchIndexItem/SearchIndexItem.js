import React, { Component } from "react";
var datetime = require("node-datetime");

class SearchIndexItem extends Component {

 
  render() {
    const {
      date_time 
    } = this.props.item
    let dt = datetime.create(date_time)
    let formattedDate = dt.format('m/d/y H:M');
    return (
      <h1>{formattedDate}</h1>
    )
  }
}

export default SearchIndexItem;
