import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css'
//import styled from 'styled-components';
//import 'typeface-roboto'
import Guest from './Guest'
import EditTableModal from './EditTable'
import { Droppable } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {
    withStyles,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button

} from '@material-ui/core';




const styles = theme => ({
    paper: {

    },
    tableWrapper: {
        margin: 8,
        width: 280,
        minHeight: 500,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'darkgrey',
        // transition: width 2s, height 4s;
        // transition: background-color 0.2s ease;
        //backgroundColor: ${ props => (props.isDraggingOver ? '#4A6572' : '#4A6572') }
        // backgroundColor: 
        fontFamily: 'Roboto Slab, serif',
        position: 'relative',
        // justifyContent: '',



    },

    tableHeader: {
        padding: 5,

    },

    tableAvatar: {
        height: 60,
        width: 60,
        color: 'black',
        marginBottom: 5,
        //   borderRadius: 2,
        /*         borderWidth:2,
                borderStyle:'solid', */
        fontSize: 18

    },

    iconButton: {
        height: 35,
        width: 35,


    },
    icon: {
        height: 20,
        width: 20,

    },
    guestListWrapper: {
        paddingTop: 5,
        overflowY: 'hidden',
        overflowX: 'hidden',
    }



});





@inject("store")
@observer
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { openDeleteTable: false };
    }

    handleOpenDeleteTable = () => {
        this.setState({ openDeleteTable: true });
    };

    handleCloseDeleteTable = () => {
        this.setState({ openDeleteTable: false });
    };


    handleOnClick = (guestIndex) => {
        let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
        let tables = currentEvent.tables.splice(0);
        let guests = currentEvent.guests.splice(0);

        let myTable = tables.find(table => this.props.table._id === table._id);
        let myGuest = myTable.guests.splice(guestIndex, 1);

        let theGuest = guests.find(guest => guest._id === myGuest[0]._id);
        theGuest.seated = false;

        this.props.store.updateGuests(guests);
        this.props.store.updateTables(tables);

    }

    handleDeleteTable = () => {
        this.setState({ openDeleteTable: false });
        let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
        let tables = currentEvent.tables.splice(0);
        let guests = currentEvent.guests.splice(0);

        let myTable = tables.find(table => this.props.table._id === table._id);
        let tableIndex = tables.findIndex(table => this.props.table._id === table._id)


        for (let i = 0; i < myTable.guests.length; i++) {
            let guestIndex = guests.findIndex(guest => guest._id === myTable.guests[i]._id);
            guests[guestIndex].seated = false;
        }

        tables.splice(tableIndex, 1);

        this.props.store.updateGuests(guests);
        this.props.store.updateTables(tables);


    }

    render() {
        const { classes } = this.props;
        const colorCode = this.props.store.user.categories.find(
            category => category._id === this.props.table.category).colorCode;
        let guests = this.props.table.guests;
        let sumGuests = 0;
        for (let i = 0; i < guests.length; i++) {
            sumGuests += (guests[i].numInvited - guests[i].numNotComing);
        }


        return (
            <div>
                <Dialog
                    open={this.state.openDeleteTable}
                    onClose={this.handleCloseDeleteTable}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to remove this table?
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDeleteTable} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleDeleteTable} color="primary" autoFocus>
                            Remove
            </Button>
                    </DialogActions>
                </Dialog>
                <Paper className={classes.tableWrapper} >
                    <Paper className={classes.tableHeader} >
                        <Grid container spacing={0}>
                            <Grid item xs={12} align="right">
                            <EditTableModal></EditTableModal>
                                {/* <IconButton aria-label="Edit" className={classes.iconButton} >
                                    <EditIcon className={classes.icon} />
                                </IconButton> */}
                                <IconButton aria-label="Delete" className={classes.iconButton} onClick={this.handleOpenDeleteTable} >
                                    <ClearIcon className={classes.icon} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Typography variant="caption" gutterBottom align="center">
                                    Table {this.props.index + 1}
                                </Typography>
                                <Typography variant="title" gutterBottom align="center" >
                                    {this.props.table.title}
                                </Typography>
                                <Avatar className={classes.tableAvatar} style={{ backgroundColor: colorCode }}>
                                    {sumGuests}/{this.props.table.maxGuests}</Avatar>
                            </Grid>
                        </Grid>


                    </Paper>
                    <Droppable droppableId={this.props.table._id}>
                        {(provided) => (
                            <div style={{ minHeight: 290 }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={classes.guestListWrapper}>

                                {this.props.table.guests.map((guest, index) => (
                                    <Guest table={this.props.table} index={index} key={guest._id} guest={guest} handleOnClick={this.handleOnClick} />
                                ))}
                                {provided.placeholder}
                            </div>


                        )}
                    </Droppable>
                </Paper>

            </div>




        );
    }
}

Table.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Table);
/* @inject("store")
@observer
class GuestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (<Grid item xs={12}
            innerRef={this.props.provided.innerRef}
            {...this.props.provided.droppableProps}
        >
            <Paper className={classes.paper}>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={this.props.table.title}/>
                </ListItem>
                {this.props.table.guests.map((guest, index) => (
                    <Guest table={this.props.table} index={index} key={guest._id} guest={guest} />
                ))}
                {this.props.provided.placeholder}
            </Paper>
        </Grid>);
    } */
/*     render() {
        return (<Container
            innerRef={this.props.provided.innerRef}
            {...this.props.provided.droppableProps}
           >
            {this.props.table.guests.map((guest, index) => (
                <Guest table={this.props.table} index={index} key={guest._id} guest={guest} />
            ))}
            {this.props.provided.placeholder}
        </Container>);
    }
 }*/
