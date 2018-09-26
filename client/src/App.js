
import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import EventPage from './components/EventPage';
import './App.css';
import EventManager from './components/EventManager';
import AppDescription from './components/AppDescription';

import { BrowserRouter, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import { action } from "mobx";
import Navbar from './components/Navbar';
import { DragDropContext } from 'react-beautiful-dnd';
import Rsvp from './components/Rsvp';
import Test from './components/Test';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#212121', light: '#9e9e9e' }, // Purple and green play nicely together.
    secondary: { main: '#560027' },
  },
});
// primary #263238 P — Light #4f5b62 P — Dark #000a12
//secondary #b0bec5 S — Light #e2f1f8 S — Dark #808e95
@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvpfunc: false,
      // endpoint: "http://127.0.0.1:3001",
      endpoint: "https://beourguest.herokuapp.com",

    }
  }

  @action
  updateTablesInDb = () => {

  }

  @action
  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("beOurGuestUser"));
    let eventIndex = JSON.parse(localStorage.getItem("beOurGuestEventIndex"));

    if (user !== null) {
      // console.log(user.username);
      axios.post('/beOurGuest/login', { name: user.username, pass: user.password })
        .then(response => {
          debugger
          if (response.data !== "") {
            this.props.store.updateUser(response.data);
            if (eventIndex !== null) {
              console.log("eventIndex   ===" + eventIndex)
              this.props.store.thisEventIndex(eventIndex)


            }
          }
          else {
            console.log("no user Account ")
          }
        })
        .catch(function (error) { console.log(error); });
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
  updetGuset = (obj) => {
    let events = this.props.store.user.events;
    for (let index = 0; index < events.length; index++) {  //get event index
      if (events[index]._id == obj.eventId) {

        console.log("event index : " + index)
        for (let i_g = 0; i_g < events[index].guests.length; i_g++) {// get gest indes
          if (events[index].guests[i_g]._id == obj.guestId) {
            debugger
            console.log("guest index : " + i_g)
            this.props.store.realTimeRsvp(index, i_g, obj.coming, obj.notComing)
            break;
          }
        }
      }
    }
  }
  render() {
    const socket = io.connect()
    // socket = socketIOClient(this.state.endpoint);
    // socket.on('backRsvp', (obj) => {
    //   console.log(JSON.stringify(obj))
    //   this.updetGuset(obj)
    // })


    socket.on('backRsvp', function (data) {
      console.log(JSON.stringify(obj))
      this.updetGuset(obj)
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App" >

          {!this.state.rsvpfunc && <Navbar />}
          {(this.props.store.eventIndex != null && this.props.store.user.userLog) ?
            < EventManager /> : false}
          {/* <Test /> */}
          {!this.props.store.myEventPage && <EventPage />}
          {/* {!this.props.store.user.userLog && <AppDescription />} */}
          {/* <BrowserRouter>
            <Route
              exact path="/beuorguest/rsvp/:vetId/:eventId/:guestId/"
              render={(props) => <Rsvp {...props} ChangeToRsvpPage={this.ChangeToRsvpPage} />}
            />
          </BrowserRouter> */}
          <BrowserRouter>
            <div>
              {!this.props.store.user.userLog && <Route exact path="/" component={AppDescription} />}
              <Route exact path="/beuorguest/rsvp/:vetId/:eventId/:guestId/"
                render={(props) => <Rsvp {...props} ChangeToRsvpPage={this.ChangeToRsvpPage} />}
              />
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;