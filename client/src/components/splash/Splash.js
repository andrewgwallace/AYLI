import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import './Splash.css';
import SearchButton from '../header/SearchButton'
const { Content } = Layout;


class Splash extends Component {

  render() {

    return <Row className="splash" type="flex" justify="space-around" align="middle" style={{ height: "90vh" }}>
        <Col span={10} className="centerContent">
        <img className="mainLogo" src="/img/AYLI_logo.png"/>
          <h2>All the world's a stage.</h2>
          <SearchButton className="splashSearchButton" submitSearch={this.props.search} updateSearch={this.props.updateSearch} currentSearch={this.props.currentSearch} />
          {/* <h3>Click "Find a Performer!" above to get started</h3>  */}
        </Col>
      </Row>;
  }
}

export default Splash