import React, { Component } from 'react';
import { Button, Layout } from 'antd'
// import './Twitter.css';
import '../app/App.css'
const {Content} = Layout
class Twitter extends Component {

    state = {
      size: 'default',
    }

  componentDidMount() {
    this.parseToken();
  }

  parseToken(user) {
    if (localStorage.token) {
      const base64Payload = localStorage.token.split('.')[1]
      const decodedPayload = atob(base64Payload)
      const user = JSON.parse(decodedPayload)
      this.props.updateUser(user);
      return user
   }
    this.props.updateUser(user);   
  }

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token')
    this.parseToken()
  }

  twitterLogin = (e) => {
    e.preventDefault();
    let popup;
    window.addEventListener('message', (event) => {
      if (event.data.token) {
        localStorage.token = event.data.token;
        // this.setState({
        //   user: null
        // })
        this.parseToken();

        popup.close();
        
      }
    });
    const width = 700;
    const height = 600;
    const top = window.screen.height / 2 - height / 2;
    const left = window.screen.width / 2 - width / 2;
    const authURL = window.location.hostname === "localhost" ? "http://localhost:3004/auth/twitter/" : "http://infinite-sea-10025.herokuapp.com/auth/twitter";
    popup = window.open(authURL, "Sign In With Twitter", `width=${width},height=${height},top=${top},left=${left},resizable,scrollbar=yes,status=1`);
  }

  render() {
    const size = this.state.size;
    return !this.props.currentUser ? <Button onClick={this.twitterLogin} className="twitter-login" type="primary" icon="twitter" size={size}>
        Sign In
      </Button> : <Button onClick={this.logout} className="twitter-login" type="primary" icon="twitter" size={size}>
        Log Out
      </Button>;
  }
}

export default Twitter;