
import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import EventManager from './components/EventManager';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import CreateEvent from './components/CreateEvent';
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';
import Rsvp from './components/Rsvp';

import Test from './components/Test';


@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvpfunc: false,
    }///http://localhost:3000/beuorguest/rsvp/:evntid/:guestid   for  rsvp
  }
  ChangeOptions = (user) => {  // remov this
    this.setState({ Options: !this.state.Options })   // login   or signup
  }

  componentWillMount() {
    axios.post('/beOurGuest/login', { name: "user1", pass: "111" })
      .then(response => {
        if (response.data !== "") {
          // console.log("user login  " + JSON.stringify(response.data))
          this.props.store.updateUser(response.data)
        } else {
          console.log("no user Account ")
        }
      }).catch(function (error) { console.log(error); });
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        {(this.props.store.eventIndex != null && this.props.store.user.userLog) ? < EventManager /> : false}

        {/* <Test /> */}
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