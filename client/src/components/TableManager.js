import React, { Component } from 'react';
import TableList from './TableList';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%"
    },
});




@inject("store")
@observer
export class TableManager extends Component {
    constructor(props) {
        super(props);
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
        const destinationIndex = currentEvent.tables.findIndex(table => table._id === result.destination.droppableId);

        let finish = currentEvent.tables[destinationIndex];
        let unseatedGuests = currentEvent.guests.filter(guest => guest.seated === false);
        let myGuest = unseatedGuests[result.source.index];
        let guestSourceIndex = currentEvent.guests.findIndex(guest => guest._id === myGuest._id);
        let newGuests = currentEvent.guests.splice(0);
        newGuests[guestSourceIndex].seated = true;

        const finishGuests = Array.from(finish.guests);
        finishGuests.splice(result.destination.index, 0, newGuests[guestSourceIndex]);
        const newFinish = {
            ...finish,
            guests: finishGuests
        }

        //TODO update to db

        let newTables = currentEvent.tables.splice(0);
        newTables[destinationIndex] = newFinish;


        this.props.store.updateTables(newTables);
        this.props.store.updateGuests(newGuests);
        return;
    }

    if (result.destination.droppableId === "-1") {
        const sourceIndex = currentEvent.tables.findIndex(table => table._id === result.source.droppableId);
        let start = Object.assign(currentEvent.tables[sourceIndex]);
        const newGuests = Array.from(start.guests);
        let myGuest = newGuests.splice(result.source.index, 1);
        let index = currentEvent.guests.findIndex(guest => myGuest[0]._id === guest._id);
        let eventGuests = currentEvent.guests.splice(0);
        eventGuests[index].seated = false;
        start.guests = newGuests


        //TODO update to db

        let newTables = Array.from(currentEvent.tables);
        newTables[sourceIndex] = start;


        this.props.store.updateTable(start, sourceIndex);
        //this.props.store.updateTables(newTables);
        this.props.store.updateGuests(eventGuests);

        console.log(currentEvent.tables);
        return;
    }


    const sourceIndex = currentEvent.tables.findIndex(table => table._id === result.source.droppableId);
    const destinationIndex = currentEvent.tables.findIndex(table => table._id === result.destination.droppableId);

    const start = currentEvent.tables[sourceIndex];
    const finish = currentEvent.tables[destinationIndex];

    if (start === finish) {
        const newGuests = Array.from(start.guests);
        let myGuest = newGuests.splice(result.source.index, 1);
        newGuests.splice(result.destination.index, 0, myGuest[0]);


        const newTable = {
            ...start,
            guests: newGuests
        };

        let newTables = Array.from(currentEvent.tables);
        newTables[sourceIndex] = newTable;

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
    newTables[sourceIndex] = newStart;
    newTables[destinationIndex] = newFinish;

    this.props.store.updateTables(newTables);
}

    render() {
        const { classes } = this.props;
        return (
          
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <TableList />
                </DragDropContext>
            


        );
    }
}



export default withStyles(styles)(TableManager);