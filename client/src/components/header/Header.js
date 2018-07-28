import React, { Component } from 'react'
import Twitter from './Twitter'
import SearchBox from './SearchBox'
import {
  Layout,
  Menu,
  Avatar,
} from 'antd';

const { Header } = Layout;

class HeaderComponent extends Component {
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
      <Layout className="layout">
        <Header>
          <div className="logo" />
            <SearchBox submitSearch={this.props.search} updateSearch={this.props.updateSearch} currentSearch={this.props.currentSearch} />
            <Twitter updateUser={this.updateUser} currentUser={this.state.user} />
      </Header>
    </Layout>
    )
  }
}

export default HeaderComponent