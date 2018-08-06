import React from "react";
import './App.css';
import EventsContainer from '../eventsContainer/EventsContainer';
import Splash from '../splash/Splash';
import HeaderComponent from '../header/Header'
import { Layout } from "antd";

const { Content } = Layout;


class App extends React.PureComponent {

  componentWillMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    return !this.state.loading && <div className="App">
        <Content>
          <EventsContainer />
        </Content>
      </div> 
  }
}


export default App;
