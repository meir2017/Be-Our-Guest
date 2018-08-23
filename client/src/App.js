import React, { Component } from 'react';
<<<<<<< HEAD
import CssBaseline from '@material-ui/core/CssBaseline';
=======

>>>>>>> f382d095deb534fdeec7b572439c70ef5ca73d30
import './App.css';
// import SignIn from './components/SignIn';
import EventManager from './components/EventManager';
import CreateEvent from './components/CreateEvent';
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';


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
      
        {!this.props.store.user.userLog && <LogIn />}
        <br /><br />  <br /> <br />
<<<<<<< HEAD

          {this.props.store.user.userLog &&
            <CreateEvent
              addEvent={this.addEvent}
              removEvent={this.removEvent}
            />}
=======
        <EventManager />
        {this.props.store.user.userLog && <CreateEvent
          AddEvent={this.AddEvent}
          RemovEvent={this.RemovEvent} />}
>>>>>>> f382d095deb534fdeec7b572439c70ef5ca73d30

        {/* <Meir /> */}
      </div>
    );
  }
}

export default App;
