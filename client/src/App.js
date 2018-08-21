"use strict";
import React, { Component } from 'react';

import './App.css';
// import SignIn from './components/SignIn';
import EventManager from './components/EventManager';



class App extends Component {
  render() {
    return (
      <div className="container">
          {/* Navbar will be rendered here */}
         <div className="app-description">
          {/* app description pop up will go here */}
          {/* <h4>BeOurGuest Helps you to easily create and manage your event: invite guests, create and send invitations, track RSVPs, arrange guest seating, and much more!</h4>
          <h4>Sign in to create new event!</h4> */}
        </div>
        <div className="app-title">
          <EventManager />
        </div>
      </div>
    );
  }
}

export default App;
