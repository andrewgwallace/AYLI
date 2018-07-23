import React, { Component } from 'react';

class ArtistDetails extends Component {

  render() {
    const { artist } = this.props.artistDetails
    console.log(artist.id)
   return (
      <div>
      <img src={profileImg}></img>
      <h2>{displayName}</h2>
      <h3>{twitter_id}</h3>
      if ({youtube_id}) {
        <h3>{youtube_id}</h3>
      }
      if ({instagram_id}) {
        <h3>{instagram_id}</h3>
      }
      </div>
    )
  }
}

export default ArtistDetails;