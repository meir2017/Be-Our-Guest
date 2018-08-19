"use strict";
import React, { Component } from 'react';

import './App.css';
import SignIn from './SignIn';
import CreateEvent from './CreateEvent';
import EventManager from './EventManager';



class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="app-title">
          <SignIn />
          <EventManager />
          <CreateEvent onClick={this.props}/>
        </div>
        <div className="app-description">
          <h4>BeOurGuest Helps you to easily create and manage your event: invite guests, create and send invitations, track RSVPs, arrange guest seating, and much more!</h4>
          <h4>Sign in to create new event!</h4>
        </div>
      </div>
    );
  }
}

export default App;
