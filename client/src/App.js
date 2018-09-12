
import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import EventManager from './components/EventManager';
import { BrowserRouter, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import { action } from "mobx";
import Navbar from './components/Navbar';
import { DragDropContext } from 'react-beautiful-dnd';
import Rsvp from './components/Rsvp';
import MiniDrawer from './components/SideNavbar';
import ClippedDrawer from './components/ClippedDrawer'

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

  @action
  updateTablesInDb = () => {

  }

  @action
  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("beOurGuestUser"));
    let eventIndex = JSON.parse(localStorage.getItem("beOurGuestEventIndex"));

    if (user !== null) {
      console.log(user.username);
      axios.post('/beOurGuest/login', { name: user.username, pass: user.password })
        .then(response => {
          if (response.data !== "") {
            // console.log("user login  " + JSON.stringify(response.data))
            this.props.store.updateUser(response.data);
          }
          else {
            console.log("no user Account ")
          }
        })
        .catch(function (error) { console.log(error); });
    }

    if (eventIndex != null) {
      this.props.store.updateEventIndex(eventIndex);
    }
  }




  onDragStart = result => {
    console.log("start");
  }

  onDragUpdate = result => {
    console.log("update");
  }

  ChangeToRsvpPage = (e) => {
    this.setState({ rsvpfunc: true })
  }
  render() {
    return (


      <div className="App" >
{/* <Navbar /><MiniDrawer /> */}
        {!this.state.rsvpfunc &&
          <div>   <ClippedDrawer></ClippedDrawer>
          </div>}
        {(this.props.store.eventIndex != null && this.props.store.user.userLog) ?
          < EventManager /> : false}

        <BrowserRouter>
          <Route
            exact path="/beuorguest/rsvp/:vetId/:eventId/:guestId/"
            render={(props) => <Rsvp {...props} ChangeToRsvpPage={this.ChangeToRsvpPage} />}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;