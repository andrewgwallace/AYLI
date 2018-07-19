import React, { Component } from "react";
import TwitterLogin from './TwitterLogin';
// import './Twitter.css';

class LoginAndDetails extends Component {

  // componentDidMount = async () => {
  //   //Get all shows
  //   const getArtistStatus = await fetch("api/shows")
  //   const shows = await showsResponse.json()
  //   if (shows) {
  //     this.setState({ loading: false, shows: shows });
  //   }
  // };


  render() {

    return (
      <TwitterLogin />
    )
  }

}

export default LoginAndDetails;
