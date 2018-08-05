import React, { Component } from 'react';
import {Card, Icon, Row, Col} from 'antd'
import "./EventsContainer.css";

const {Meta} = Card;

class EventDetails extends Component {

  render() {
    const twURL = "https://www.twitter.com/"
    const ytURL = "https://www.youtube.com/user/"
    const igURL = "https://www.instagram.com/"

    const eventDetails = this.props.currentEvent
    
    if (!eventDetails) {
      return (
        <div>
          <h3>
            Ayli helps you find local street performers in your area. To get started, click "Find a Performer!" above.
          </h3>
        </div>
      )
    } else {
      return (

      <Row type="flex" justify="space-around" align="middle">
        <Col>
      <Card cover={<img src={eventDetails.profileImg.replace(/(_normal)/g, "_200x200")} />} style={{ width: '80%' }}>
          <h1>{eventDetails.displayName}</h1>

        <a href={twURL + eventDetails.twitter_id} target="_blank">
          <Icon type="twitter" style={{ fontSize: 24, color: "#55acee" }} />
        </a>

        {eventDetails.youtube_id && <a href={ytURL + eventDetails.youtube_id} target="_blank">
          <Icon type="youtube" style={{ fontSize: 24, color: "#ff0000" }} />
        </a>}

        {eventDetails.instagram_id && <a href={igURL + eventDetails.instagram_id} target="_blank">
          <Icon type="instagram" style={{ fontSize: 24, color: "#6dc993" }} />
        </a>}

          <p>{eventDetails.bio}</p>
          <Meta 
          description={eventDetails.details} />
        </Card>
        </Col>
        </Row>

      )
        /* <a href={twURL + eventDetails.twitter_id} target="_blank">
            {" "}
            <img src="/social/tw.png" className="social-icon tw-icon" />
          </a>
          {eventDetails.youtube_id && <a href={ytURL + eventDetails.youtube_id} target="_blank">
              <img src="/social/yt.png" className="social-icon yt-icon" />
            </a>}
          {eventDetails.instagram_id && <a href={igURL + eventDetails.instagram_id} target="_blank">
              <img src="/social/ig.png" className="social-icon ig-icon" />
            </a>} */
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

