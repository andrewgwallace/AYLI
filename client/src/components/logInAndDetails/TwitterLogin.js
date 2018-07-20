import React, { Component } from 'react';
// import './Twitter.css';

class Twitter extends Component {
  state = {
    user: null
  }

  componentDidMount(){
    this.parseToken();
  }

  parseToken(){
    if (localStorage.token) {
      const base64Payload = localStorage.token.split('.')[1]
      const decodedPayload = atob(base64Payload)
      const user = JSON.parse(decodedPayload)
      this.setState({
        user
      })
    }
  }

  twitterLogin = () => {
    let popup;
    window.addEventListener('message', (event) => {
      if (event.data.token) {
        localStorage.token = event.data.token;
        popup.close();
      }
    });
    const width = 700;
    const height = 600;
    const top = window.screen.height / 2 - height / 2;
    const left = window.screen.width / 2 - width / 2;
    popup = window.open('http://localhost:3004/auth/twitter', 'Sign In With Twitter', `width=${width},height=${height},top=${top},left=${left},resizable,scrollbar=es,status=1`)
  }

  render() {
    return (
        !this.state.user ? 
        <button onClick={this.twitterLogin}>Twitter Sign-In</button>
        :
        <button onClick={this.logout}>Log Out</button>
    )
  }
}

export default Twitter;