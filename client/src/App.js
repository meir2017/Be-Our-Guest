"use strict";
import React, { Component } from 'react';
import './App.css';
// import Meir from './TestMeir';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateEvent from './components/CreateEvent';
import axios from 'axios';
import { observer, inject } from 'mobx-react';


// @inject("store");
// @observer;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLog: false,
      Options: true,

      UserId: "",
      username: "",
      password: "",
      email: "",
      events: [],
      guests: [],
      categories: []

    }
  }
  userLogin = (name, pass) => {
    axios.post('/beOurGuest/login', { name: name, pass: pass })
      .then(response => {
        console.log((response.data))
        if (response.data != "")
          this.setState({ userLog: true, UserId: response.data })

        this.setState({
          UserId: response.data._id,
          username: name,
          password: pass,
          email: response.data.email,
          events: response.data.events,
          guests: response.data.guests,
          categories: response.data.categories

        })

      }).catch(function (error) {
        console.log(error);
      });

  }
  userRegister = (user) => {
    //{inputText: "meir", emailText: "66meir46", passText: "1212", passConfirm: "1212"}
    console.log(user)
    if (user.passText == user.passConfirm) {
      axios.post('/beOurGuest/newUser', user)
        .then(response => {
          console.log((response.data))
          this.setState({ UserId: response.data })

          this.setState({ userLog: true, UserId: response.data })
        })
    }
    else
      alert("Your passwords do not match")
  }
  ChangeOptions = (user) => {

    this.setState({ Options: !this.state.Options })

  }
  render() {
    return (
      <div className="App">

        {(!this.state.userLog && this.state.Options) && <SignIn userLogin={this.userLogin} ChangeOptions={this.ChangeOptions} />}
        {(!this.state.userLog && !this.state.Options) && <SignUp userRegister={this.userRegister} ChangeOptions={this.ChangeOptions} />}
        <br />
        <br />  <br />
        <br />

        {/* {this.state.userLog && <Meir />} */}
        {/* <Meir /> */}
        {this.state.userLog && <CreateEvent UserId={this.state.UserId} />}

        {/* <CreateEvent /> */}


      </div>
    );
  }
}

export default App;
