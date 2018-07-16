import React, { Component } from 'react';
import TwitterLogin from "react-twitter-auth/lib/react-twitter-auth-component.js";
// import './Twitter.css';

class Twitter extends Component {
  // constructor(props) {
  //   super(props);
  //  }

  state = {
    isAuthenticated: false,
    user: null,
    token: ""
  };

  onSuccess = async (response) => {
    await response.json().then(body => {
      alert(JSON.stringify(body));
    });
  }

  onFailed = async (error) => {
    await alert(error);
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <TwitterLogin
        loginUrl="http://localhost:3000/api/v1/auth/twitter"
        onFailure={this.onFailed}
        onSuccess={this.onSuccess}
        requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse"
      />
    )
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Twitter;
