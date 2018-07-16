import React, { Component } from 'react';
import SearchIndexItem from './searchIndexItem/SearchIndexItem'


class SearchItemIndex extends Component {
  state = {
    results: this.props.shows
  }

  render() {
    const searchIndexList = this.state.results.map((item) => {
    return (
      <SearchIndexItem key={item.id} item={item} />
    );
    });
    return (
      searchIndexList
    )
  }
}

export default SearchItemIndex;
