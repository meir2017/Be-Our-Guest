"use strict";
import React, { Component } from 'react';
import './App.css';
// import Meir from './TestMeir';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateEvent from './components/CreateEvent';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import Navbar from './components/Navbar';
import TableList from './components/TableList';
import { DragDropContext } from 'react-beautiful-dnd';


 @inject("store")
 @observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Options: true,
    }
  }
  ChangeOptions = (user) => {

    this.setState({ Options: !this.state.Options })   // login   or signup

  }
  onDragEnd = result => {
    let currentEvent = this.props.store.user.events[this.props.store.eventIndex];

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




  onDragStart = result => {
    console.log("start");
  }

  onDragUpdate = result => {
    console.log("update");
  }

  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        <DragDropContext
          onDragEnd={this.onDragEnd}
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
        >
          <TableList />
        </DragDropContext>

        {/*   {(!this.props.store.user.userLog && this.state.Options) && <SignIn ChangeOptions={this.ChangeOptions} />}
        {(!this.props.store.user.userLog && !this.state.Options) && <SignUp ChangeOptions={this.ChangeOptions} />}
        <br /><br />  <br /> <br />

        {this.props.store.user.userLog && <CreateEvent
          AddEvent={this.AddEvent}
          RemovEvent={this.RemovEvent} />} */}
      </div>
    );
  }
}

export default App;
