
import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import EventManager from './components/EventManager';
import { BrowserRouter, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';
import { DragDropContext } from 'react-beautiful-dnd';
import Rsvp from './components/Rsvp';

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
    let user = JSON.parse(localStorage.getItem("beOurGuestUser"));
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
  }

  onDragEnd = result => {
    let currentEvent = this.props.store.user.events[this.props.store.eventIndex];

    if (result.destination === null)
      return;

    if ((result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index) ||
      (result.source.droppableId === "-1" && result.destination.droppableId === "-1")) {
      return;
    }



    if (result.source.droppableId === "-1") {
      let finish = currentEvent.tables[Number(result.destination.droppableId)];
      let unseatedGuests = currentEvent.guests.filter(guest => guest.seated === false);
      let myGuest = unseatedGuests[result.source.index];
      let guestSourceIndex = currentEvent.guests.findIndex(guest => guest._id === myGuest._id);
      let newGuests = Array.from(currentEvent.guests)
      newGuests[guestSourceIndex].seated = true;

      const finishGuests = Array.from(finish.guests);
      finishGuests.splice(result.destination.index, 0, newGuests[guestSourceIndex]);
      const newFinish = {
        ...finish,
        guests: finishGuests
      }

      //TODO update to db

      let newTables = Array.from(currentEvent.tables);
      newTables[Number(result.destination.droppableId)] = newFinish;

      this.props.store.updateTables(newTables);
      this.props.store.updateGuests(newGuests);
      return;
    }

    if (result.destination.droppableId === "-1") {
      let start = Object.assign(currentEvent.tables[Number(result.source.droppableId)]);
      const newGuests = Array.from(start.guests);
      let myGuest = newGuests.splice(result.source.index, 1);
      let index = currentEvent.guests.findIndex(guest => myGuest[0]._id === guest._id);
      let eventGuests = Array.from(currentEvent.guests);
      eventGuests[index].seated = false;
      start.guests = newGuests


      //TODO update to db

      let newTables = Array.from(currentEvent.tables);
      newTables[Number(result.source.droppableId)] = start;


      this.props.store.updateTable(start, Number(result.source.droppableId));
      //this.props.store.updateTables(newTables);
      this.props.store.updateGuests(eventGuests);

      console.log(currentEvent.tables);
      return;
    }





    const start = currentEvent.tables[Number(result.source.droppableId)];
    const finish = currentEvent.tables[Number(result.destination.droppableId)];

    if (start === finish) {
      const newGuests = Array.from(start.guests);
      let myGuest = newGuests.splice(result.source.index, 1);
      newGuests.splice(result.destination.index, 0, myGuest[0]);


      const newTable = {
        ...start,
        guests: newGuests
      };

      let newTables = Array.from(currentEvent.tables);
      newTables[Number(result.source.droppableId)] = newTable;

      this.props.store.updateTables(newTables);
      return;
    }

    //moving from one column to another
    const startGuests = Array.from(start.guests);
    let myGuest = startGuests.splice(result.source.index, 1);
    const newStart = {
      ...start,
      guests: startGuests
    }

    const finishGuests = Array.from(finish.guests);
    finishGuests.splice(result.destination.index, 0, myGuest[0]);
    const newFinish = {
      ...finish,
      guests: finishGuests
    }

    let newTables = Array.from(currentEvent.tables);
    newTables[Number(result.source.droppableId)] = newStart;
    newTables[Number(result.destination.droppableId)] = newFinish;

    this.props.store.updateTables(newTables);
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
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">

          {!this.state.rsvpfunc && <Navbar />}
          {(this.props.store.eventIndex != null && this.props.store.user.userLog) ? < EventManager /> : false}

          <BrowserRouter>
            <Route
              exact path="/beuorguest/rsvp/:vetId/:eventId/:guestId/"
              render={(props) => <Rsvp {...props} ChangeToRsvpPage={this.ChangeToRsvpPage} />}
            />
          </BrowserRouter>
        </div>
      </DragDropContext>
    );
  }
}

export default App;