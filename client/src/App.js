"use strict";
import React, { Component } from 'react';
import './App.css';
// import Meir from './TestMeir';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateEvent from './components/CreateEvent';
import axios from 'axios';
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
  ChangeOptions = (user) => {

    this.setState({ Options: !this.state.Options })   // login   or signup

  }
  render() {
    return (
      <div className="App">
        <Navbar />
        {(!this.props.store.user.userLog && this.state.Options) && <SignIn ChangeOptions={this.ChangeOptions} />}
        {(!this.props.store.user.userLog && !this.state.Options) && <SignUp ChangeOptions={this.ChangeOptions} />}
        <br /><br />  <br /> <br />

        {this.props.store.user.userLog && <CreateEvent
          AddEvent={this.AddEvent}
          RemovEvent={this.RemovEvent} />}

      </div>
    );
  }
}

export default App;
