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
          <HeaderComponent search={this.submitSearch} updateSearch={this.updateSearch} currentSearch={this.state.search} />
          <Splash />
        </Content>
      </div> 
  }
}


export default App;
