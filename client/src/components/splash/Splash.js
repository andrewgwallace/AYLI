import React, { Component } from "react";
import { Button, Row, Col } from "antd";

class Splash extends Component {

render() {

 const splashOff = this.props.turnSplashOff


  return (
    <Row>
      <Col span={12}>
        <h1> WELCOME!</h1>
        <Button onClick={splashOff}>Let's Go!</Button>
      </Col>
    </Row>
  )
}

}

export default Splash