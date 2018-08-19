"use strict";
import React, { Component } from 'react';
import './App.css';
// import Meir from './TestMeir';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateEvent from './components/CreateEvent';
import axios from 'axios';
import { observer, inject } from 'mobx-react';


@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userLog: false,
      Options: true,
    }
  }

  // AddEvent = (item) => {
  //   let listEvents = this.state.events.concat();
  //   listEvents.push(item)
  //   this.setState({ events: listEvents })
  // }
  // RemovEvent = (eventIndex) => {
  //   let itemEvent = this.state.events[eventIndex];
  //   //console.log(JSON.stringify(itemEvent))
  //   axios.delete(`/beOurGuest/RemovEvent/${this.state._Id}/${itemEvent._id}/`)
  //     .then(response => {
  //       console.log((response.data))
  //       let listEvents = this.state.events.concat();
  //       listEvents.splice(eventIndex, 1)
  //       this.setState({ events: listEvents })

  //     })
  // }
  ChangeOptions = (user) => {

    this.setState({ Options: !this.state.Options })   // login   or signup

  }
  render() {
    return (
      <div className="App">

        {(!this.props.store.user.userLog && this.state.Options) && <SignIn ChangeOptions={this.ChangeOptions} />}
        {(!this.props.store.user.userLog && !this.state.Options) && <SignUp ChangeOptions={this.ChangeOptions} />}
        <br /><br />  <br /> <br />

        {/* {this.state.userLog && <Meir />} */}
        {/* <Meir /> */}
        {this.props.store.user.userLog && <CreateEvent
          AddEvent={this.AddEvent}
          RemovEvent={this.RemovEvent} />}

        {/* <CreateEvent /> */}

      </div>
    );
  }
}

export default App;
