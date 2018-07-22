import React, { Component } from 'react'
import Twitter from './Twitter'

class Header extends Component {
  state = {
    loggedIn: false,
    user: null
  }

  updateUser = (user) => {
    this.setState({
      user
    })
  }


  render() {
    return (
      <Twitter updateUser={this.updateUser} currentUser={this.state.user}/>
    )
  }
}

export default Header