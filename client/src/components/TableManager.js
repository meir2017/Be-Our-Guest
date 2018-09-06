import React, { Component } from 'react';
import TableList from './TableList';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import axios from 'axios';


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



        //from table0 to table
        if (result.source.droppableId === "-1") {
            const destinationIndex = currentEvent.tables.findIndex(table => table._id === result.destination.droppableId);

            let finish = currentEvent.tables[destinationIndex];
            let unseatedGuests = currentEvent.guests.filter(guest => guest.seated === false);
            let myGuest = unseatedGuests[result.source.index];
            let guestSourceIndex = currentEvent.guests.findIndex(guest => guest._id === myGuest._id);
            let newGuests = Array.from(currentEvent.guests);
            newGuests[guestSourceIndex].seated = true;


            const finishGuests = Array.from(finish.guests);
            finishGuests.splice(result.destination.index, 0, newGuests[guestSourceIndex]._id);
            const newDestinationTable = {
                ...finish,
                guests: finishGuests
            }

            this.props.store.updateGuests(newGuests);
            this.props.store.updateTable(newDestinationTable, destinationIndex);
            axios.post('/beOurGuest/updateGuestsInTable/', newDestinationTable)
                .then(response => {
                    console.log(response);
                }).then(res => {
                    axios.post('/beOurGuest/updateEventGuest/', newGuests[guestSourceIndex])
                        .then(res1 => {
                            console.log(res1);
                        });
                })
                .catch(err => console.log('Error: ', err));
            return;
        }

        //from table to table0
        if (result.destination.droppableId === "-1") {
            const sourceIndex = currentEvent.tables.findIndex(table => table._id === result.source.droppableId);
            let start = Object.assign(currentEvent.tables[sourceIndex]);
            const newGuests = Array.from(start.guests);
            let myGuest = newGuests.splice(result.source.index, 1);
            start.guests = newGuests;
            let index = currentEvent.guests.findIndex(guest => myGuest[0] === guest._id);
            let eventGuests = Array.from(currentEvent.guests);
            eventGuests[index].seated = false;



            this.props.store.updateTable(start, sourceIndex);
            this.props.store.updateGuests(eventGuests);

            axios.post('/beOurGuest/updateGuestsInTable/', start)
                .then(response => {
                    console.log(response);
                }).then(res => {
                    axios.post('/beOurGuest/updateEventGuest/', eventGuests[index])
                        .then(res1 => {
                            console.log(res1);
                        });
                })
                .catch(err => console.log('Error: ', err));

            return;
        }

        //MOVING BETWEEN TABLES
        const sourceIndex = currentEvent.tables.findIndex(table => table._id === result.source.droppableId);
        const destinationIndex = currentEvent.tables.findIndex(table => table._id === result.destination.droppableId);

        const start = currentEvent.tables[sourceIndex];
        const finish = currentEvent.tables[destinationIndex];

        //Moving within a tables
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

            this.props.store.updateTable(newTable, sourceIndex);
            axios.post('/beOurGuest/updateGuestsInTable/', newTable)
                .then(response => {
                    console.log(response);
                })
                .catch(err => console.log('Error: ', err));
            return;
        }

        //moving from one table to another
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

        axios.post('/beOurGuest/updateGuestsInTable/', newStart)
        .then(response => {
            console.log(response);
        }).then(res => {
            axios.post('/beOurGuest/updateGuestsInTable/', newFinish)
                .then(res1 => {
                    console.log(res1);
                });
        })
        .catch(err => console.log('Error: ', err));
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