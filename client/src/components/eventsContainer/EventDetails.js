import React, { Component } from 'react';

class EventDetails extends Component {

  render() {
    const twURL = "https://www.twitter.com/"
    const ytURL = "https://www.youtube.com/user/"
    const igURL = "https://www.instagram.com/"

    const eventDetails = this.props.currentEvent
    
    if (!eventDetails) {
      return (
        <div>
          <p>
            Please select an artist from the list.
          </p>
        </div>
      )
    } else {
      console.log(eventDetails.instagram_id);
      return (
        <div>
          <img src={eventDetails.profileImg}/>
          <h1>{eventDetails.displayName}</h1>
          <p>{eventDetails.details}</p>
          <p>{eventDetails.bio}</p>
          <a href={twURL + eventDetails.twitter_id} target="_blank"> <img src="/social/tw.png" className='social-icon tw-icon'/></a>
          {eventDetails.youtube_id && <a href={ytURL + eventDetails.youtube_id} target="_blank"><img src="/social/yt.png" className='social-icon yt-icon' /></a>}
          {eventDetails.instagram_id && <a href={igURL + eventDetails.instagram_id} target="_blank"><img src="/social/ig.png" className='social-icon ig-icon' /></a>}          
        </div>
      )
    }
    // const { instagram_id, youtube_id, twitter_id, displayName, profileImg, bio } = this.props.artistDetails
  }
}

export default EventDetails;



// <div>
//   <img src={profileImg}></img>
//   <h2>{displayName}</h2>
//   <h3>{twitter_id}</h3>
//   if ({youtube_id}) {
//     <h3>{youtube_id}</h3>
//   }
//   if ({instagram_id}) {
//     <h3>{instagram_id}</h3>
//   }
// </div>