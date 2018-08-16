import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Meir from './TestMeir';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateEvent from './components/CreateEvent';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLog: false,
      Options: true

    }
  }
  userLogin = (user, pass) => {

    this.setState({ userLog: true })
  }
  userRegister = (user) => {

    console.log(user)
  }
  ChangeOptions = (user) => {

    this.setState({ Options: !this.state.Options })

  }
  render() {
    return (
      <div className="App">

        {/* {(!this.state.userLog && this.state.Options) && <SignIn userLogin={this.userLogin} ChangeOptions={this.ChangeOptions} />}
        {(!this.state.userLog && !this.state.Options) && <SignUp userRegister={this.userRegister} ChangeOptions={this.ChangeOptions} />}
        <br />
        <br />  <br />
        <br />

        {this.state.userLog && <Meir />} */}
        {/* <Meir /> */}
        <CreateEvent />


      </div>
    );
  }
}

export default App;
