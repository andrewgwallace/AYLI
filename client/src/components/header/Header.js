import React, { Component } from 'react'
import Twitter from './Twitter'
import SearchButton from './SearchButton'
import {
  Layout,
  Row,
  Col
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
    return <Layout className="layout">
        <Header>
          <div className="searchAndTwitter">
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <h1 style={{ color: "white" }}>AYLI</h1>
              </Col>

              <Col span={6} className="headerSearch">
                <SearchButton submitSearch={this.props.search} updateSearch={this.props.updateSearch} turnSplashOff={this.props.turnSplashOff} currentSearch={this.props.currentSearch} style={{ textAlign: "right" }} />
              </Col>
              {/* <Col span={6} style={{ textAlign: 'right' }}> 
              <Twitter 
              updateUser={this.updateUser} 
              currentUser={this.state.user} />
            </Col> */}
            </Row>
          </div>
        </Header>
      </Layout>;
  }
}

export default HeaderComponent