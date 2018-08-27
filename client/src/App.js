import React, { Component } from 'react';

import './App.css';
import EventManager from './components/EventManager';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import CreateEvent from './components/CreateEvent';
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';
import Rsvp from './components/Rsvp';


@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvpfunc: false,
      m1: true
    }///http://localhost:3000/beuorguest/rsvp/:evntid/:guestid   for  rsvp
  }
  ChangeOptions = (user) => {  // remov this
    this.setState({ Options: !this.state.Options })   // login   or signup
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <EventManager />
        {/* {this.props.store.user.userLog && <CreateEvent
          addEvent={this.addEvent}
          RemovEvent={this.RemovEvent} />} */}

        <BrowserRouter>
          <Route
            exact path="/beuorguest/rsvp/:evntid/:guestid"
            render={(props) => <Rsvp {...props} Options={this.Options} />}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;