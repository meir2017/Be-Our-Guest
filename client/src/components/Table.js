import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import axios from 'axios';
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
  Button,
  Tooltip

} from '@material-ui/core';

const styles = theme => ({
  paper: {
  },
  tableWrapper: {
    margin: 8,
    width: 280,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    // transition: width 2s, height 4s;
    // transition: background-color 0.2s ease;
    //backgroundColor: ${ props => (props.isDraggingOver ? '#4A6572' : '#4A6572') }
    // backgroundColor: 
    fontFamily: 'Roboto Slab, serif',
    position: 'relative',
    minHeight: '97%',
    // justifyContent: '',
  },
  tableHeader: {
    padding: 5,
    backgroundColor: '#eeeeee'
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
    minHeight: '65vh'
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


  handleRemoveGuestClick = (guestIndex) => {
    let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
    let tables = Array.from(currentEvent.tables);
    let guests = Array.from(currentEvent.guests);

    let myTable = tables.find(table => this.props.table._id === table._id);
    let myGuest = myTable.guests.splice(guestIndex, 1);

    let theGuest = guests.find(guest => guest._id === myGuest[0]);
    theGuest.seated = false;

    axios.post('/beOurGuest/updateGuestsInTable/', myTable)
      .then(response => {
        console.log(response);
      }).then(res => {
        axios.post('/beOurGuest/updateEventGuest/', theGuest)
          .then(res1 => {
            console.log(res1);
          });
      })
      .catch(err => console.log('Error: ', err));
    this.props.store.updateGuests(guests);
    this.props.store.updateTables(tables);

  }

  handleDeleteTable = () => {
    this.setState({ openDeleteTable: false });
    let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
    let tables = Array.from(currentEvent.tables);
    let guests = Array.from(currentEvent.guests);

    let myTable = tables.find(table => this.props.table._id === table._id);
    let tableIndex = tables.findIndex(table => this.props.table._id === table._id)
    for (let i = 0; i < myTable.guests.length; i++) {
      let myGuests = guests.find(guest => guest._id === myTable.guests[i]);
      myGuests.seated = false;
    }
    tables.splice(tableIndex, 1);

    this.props.store.updateGuests(guests);
    this.props.store.updateTables(tables);



    axios.post('/beOurGuest/deleteTable/' + currentEvent._id, { _id: this.props.table._id })
      .then(response => {
        console.log(response);
      }).then(res => {
        axios.post('/beOurGuest/updateGuests/', guests)
          .then(res1 => {
            console.log(res1);
          });
      })
      .catch(err => console.log('Error: ', err));

  }

  render() {
    const { classes } = this.props;
    let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
    // console.log(this.props.table);
    // console.log(this.props.table.category);
    // console.log(this.props.store.user.categories);
    const myCategory = this.props.store.user.categories
      .find(category => category._id == this.props.table.category);
    // console.log(myCategory);
    let colorCode = myCategory.colorCode;
    let guests = this.props.table.guests;
    let sumGuests = 0;
    for (let i = 0; i < guests.length; i++) {
      let guest = currentEvent.guests.find(guest => guest._id === guests[i]);
      sumGuests += (guest.numInvited - guest.numNotComing);
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
                <Tooltip title="# guests seated here / Maximum guests in table">
                  <Avatar className={classes.tableAvatar} style={{ backgroundColor: colorCode }}>
                    {sumGuests}/{this.props.table.maxGuests}</Avatar>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
          <Droppable droppableId={this.props.table._id}>
            {(provided) => (
              <div style={{ minHeight: 290 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes.guestListWrapper}>

                {this.props.table.guests.map((guest_id, index) => {
                  let guest = currentEvent.guests.find(gst => gst._id === guest_id);
                  /*  console.log(guest_id);
                   console.log(currentEvent.guests);
                   console.log(guest); */
                  return <Guest table={this.props.table} index={index} key={guest._id} guest={guest} handleOnClick={this.handleRemoveGuestClick} />
                })}
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
