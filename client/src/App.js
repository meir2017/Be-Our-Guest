"use strict";
import React, { Component } from 'react';
import './App.css';
import Meir from './TestMeir';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import axios from 'axios';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
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
      resvfunc: false
    }///http://localhost:3000/beuorguest/rsvp/:evntid/:guestid   for  rsvp
  }
  Options = () => {
    this.setState({ resvfunc: true })
  }
  render() {
    return (
      <div className="App">
        {!this.state.resvfunc && <Navbar />}
        {!this.props.store.user.userLog && <Meir />}
        <br /><br />  <br /> <br />

        {this.props.store.user.userLog && <CreateEvent
          AddEvent={this.AddEvent}
          RemovEvent={this.RemovEvent}
        />}


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
