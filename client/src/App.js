
import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import EventManager from './components/EventManager';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import CreateEvent from './components/CreateEvent';
import YouLoginAs from './components/YouLoginAs';
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';
import TableList from './components/TableList';
import { DragDropContext } from 'react-beautiful-dnd';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
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
    axios.post('/beOurGuest/login', { username: "user1", password: "111" })
      .then(response => {
        if (response.data !== "") {
          // console.log("user login  " + JSON.stringify(response.data))
          this.props.store.updateUser(response.data)
        } else {
          console.log("no user Account ")
        }
      }).catch(function (error) { console.log(error); });
  }

  onDragEnd = result => {
    let currentEvent = this.props.store.user.events[this.props.store.eventIndex];

    if (result.destination === null)
      return;

    if (result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index) {
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

      this.props.store.user.events[this.props.store.eventIndex].tables = newTables;
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

    this.props.store.user.events[this.props.store.eventIndex].tables = newTables;
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("beOurGuestUser"));
    // console.log(user.username)
    if (user != null)
      axios.post('/beOurGuest/login', { name: user.username, pass: user.password })
        .then(response => {
          if (response.data !== "") {
            // console.log("user login  " + JSON.stringify(response.data))
            this.props.store.updateUser(response.data)
          } else {
            console.log("no user Account ")
          }
        }).catch(function (error) { console.log(error); });
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
          {/* once logged "Hello {item.user}" show up */}
          {(this.props.store.user.userLog) ? <YouLoginAs /> : false}

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