import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Meir from './TestMeir';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import axios from 'axios';

import CreateEvent from './components/CreateEvent';
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';

@inject("store")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Options: true,
    }
  }
  ChangeOptions = (user) => {  // remov this

    this.setState({ Options: !this.state.Options })   // login   or signup
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        {!this.props.store.user.userLog && <Meir />}
        <br /><br />  <br /> <br />

          {this.props.store.user.userLog &&
            <CreateEvent
              addEvent={this.addEvent}
              removEvent={this.removEvent}
            />}

        {/* <Meir /> */}
      </div>
    );
  }
}

export default App;
