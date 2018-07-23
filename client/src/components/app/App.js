import React from "react";
import './App.css';
import EventsContainer from '../eventsContainer/EventsContainer';
import Header from '../header/Header';

// THE MAIN APP COMPONENT
// Establish the component to rendered passing in the state which contains the markers. `markers: data.photos` is an array; you'll pass the array of performances.
class App extends React.PureComponent {

  componentWillMount() {
    this.setState({
      loading: false
    });
  }

  // Render the state of the markers on the map.

  render() {
    return (
      !this.state.loading && (
        <div>
          <Header />
          <EventsContainer />
        </div>
      )
    )
  }
}
// END SHOW MAP


export default App;
