import React, { Component } from 'react'
import Twitter from './Twitter'
import SearchBox from './SearchBox'
import {
  Layout,
  Row,
  Col,
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
        <div className="searchAndTwitter">
          <Row>
            <Col span={6}>
            <h1>AYLI</h1>
            </Col>

            <Col span={12}>
              <SearchBox submitSearch={this.props.search} updateSearch={this.props.updateSearch} currentSearch={this.props.currentSearch} />
            </Col>
              <Col span={6} style={{ textAlign: 'right' }}> 
              <Twitter 
              
              updateUser={this.updateUser} 
              currentUser={this.state.user} />
            </Col>
          </Row>
          </div>           
        </Header>
      </Layout>
    )
  }
}

export default HeaderComponent