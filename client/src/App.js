import React, { Component } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import EventPage from "./components/EventPage";
import CategoryPage from './components/CategoryPage'
import "./App.css";
import EventManager from "./components/EventManager";
import AppDescription from "./components/AppDescription";

import { BrowserRouter, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import Navbar from "./components/Navbar";
import Rsvp from "./components/Rsvp";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#212121", light: "#9e9e9e" }, // Purple and green play nicely together.
    secondary: { main: "#560027" }
  }
});


@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvpfunc: false,
      // endpoint: "http://127.0.0.1:3001"
      endpoint: "https://miertest.herokuapp.com"
    };
  }

  @action
  updateTablesInDb = () => { };

  @action
  componentWillMount() {
    if (sessionStorage.getItem("page1") !== null) {
      sessionStorage.setItem("page1", window.location.href)
    }
    let user = JSON.parse(localStorage.getItem("beOurGuestUser"));
    let eventIndex = JSON.parse(localStorage.getItem("beOurGuestEventIndex"));

    if (user !== null) {
      // console.log(user.username);
      axios
        .post("/beOurGuest/login", { name: user.username, pass: user.password })
        .then(response => {
          if (response.data !== "") {
            this.props.store.updateUser(response.data);
            if (eventIndex !== null) {
              // console.log("eventIndex   ===" + eventIndex)
              this.props.store.thisEventIndex(eventIndex);
            }
          } else {
            // console.log("no user Account ")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  onDragStart = result => {
    console.log("start");
  };

  onDragUpdate = result => {
    console.log("update");
  };

  ChangeToRsvpPage = e => {
    this.setState({ rsvpfunc: true });
  };
  updetGuset = obj => {
    let events = this.props.store.user.events;
    for (let index = 0; index < events.length; index++) {
      //get event index
      if (events[index]._id == obj.eventId) {
        // console.log("event index : " + index)
        for (let i_g = 0; i_g < events[index].guests.length; i_g++) {
          // get gest indes
          if (events[index].guests[i_g]._id == obj.guestId) {
            console.log("guest index : " + i_g);
            this.props.store.realTimeRsvp(
              index,
              i_g,
              obj.coming,
              obj.notComing
            );
            break;
          }
        }
      }
    }
  };

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("backRsvp", obj => {
      // console.log(JSON.stringify(obj))
      this.updetGuset(obj);
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          {!this.state.rsvpfunc && <Navbar />}
          {!this.state.rsvpfunc &&
            (this.props.store.eventIndex != null &&
              this.props.store.user.userLog) ? (
              <EventManager />
            ) : (
              false
            )}
          {!this.props.store.myEventPage && <EventPage />}
          {!this.props.store.myCategoryPage && <CategoryPage />}
          <BrowserRouter>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: -1
              }}
            >
              {!this.props.store.user.userLog && (
                <Route exact path="/" component={AppDescription} />
              )}
              <Route
                exact
                path="/beuorguest/rsvp/:vetId/:eventId/:guestId/"
                render={props => (
                  <Rsvp {...props} ChangeToRsvpPage={this.ChangeToRsvpPage} />
                )}
              />
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
