import React, { Component } from 'react';
import { Button, Icon } from 'antd'
// import './Twitter.css';

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
    popup = window.open('http://localhost:3004/auth/twitter', 'Sign In With Twitter', `width=${width},height=${height},top=${top},left=${left},resizable,scrollbar=yes,status=1`)
  }

  render() {
    const size = this.state.size;
    return (
      !this.props.currentUser ? 
        <Button onClick={this.twitterLogin} type="primary" icon="twitter" size={size}>Sign In</Button>
        :
        <Button onClick={this.logout} type="primary" icon="twitter" size={size}>Log Out</Button>
    )
  }
}

export default Twitter;