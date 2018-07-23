import React, { Component } from 'react'
import Twitter from './Twitter'
// import SearchBox from './SearchBox'

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
      <div>
      <Twitter updateUser={this.updateUser} currentUser={this.state.user}/>
      {/* <SearchBox /> */}
      </div>
    )
  }
}

export default Header