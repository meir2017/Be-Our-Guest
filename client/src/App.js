"use strict";
import React, { Component } from 'react';

import './App.css';
import EventManager from './components/EventManager';

import CreateEvent from './components/CreateEvent';
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';


@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Options: true,
    }
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

      </div>
    );
  }
}

export default App;
