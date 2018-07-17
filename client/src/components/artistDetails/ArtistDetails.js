import React, { Component } from "react";
var datetime = require("node-datetime");

class SearchIndexItem extends Component {


  render() {
    const {
      id, date_time, details
    } = this.props.item
    let dt = datetime.create(date_time)
    let formattedDate = dt.format('m/d/y H:M');
    return (
      <div>
        <h1>{formattedDate}</h1>
        <p>{details}</p>
      </div>
    )
  }
}

export default SearchIndexItem;