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
    marginBottom: 30,
    marginTop: 0,
    width: '98%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#bdbdbd',
    // transition: width 2s, height 4s;
    // transition: background-color 0.2s ease;
    //backgroundColor: ${ props => (props.isDraggingOver ? '#4A6572' : '#4A6572') }
    // backgroundColor: 
    fontFamily: 'Roboto Slab, serif',
    position: 'relative',
    minHeight: 55,
    // justifyContent: '',
  },
  tableHeader: {
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#eeeeee',
    margin: '0 8px 0 8px',
    width: 250,


  },
  tableAvatar: {
    height: 40,
    width: 40,
    color: 'black',
    marginBottom: 5,
    //   borderRadius: 2,
    /*         borderWidth:2,
            borderStyle:'solid', */
    fontSize: 15
  },
  iconButton: {
    height: 20,
    width: 20,
  },
  icon: {
    height: 15,
    width: 15,
  },
  guestListWrapper: {
    paddingTop: 5,
    overflowY: 'hidden',
    overflowX: 'hidden',
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 5,

  },
  tableTitle: {
    fontSize: 15
  },

  avatarContainer: {
    display: 'flex',
    'justifyContent': 'center',
    alignItems: 'center',
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
        <Paper className={classes.tableHeader} >
          <Grid container spacing={0}>
            <Grid item xs={6} align="left">
              <Typography variant="caption" gutterBottom align="left">
                Table {this.props.index + 1}
              </Typography>
              <Typography variant="title" gutterBottom align="left" className={classes.tableTitle}>
                {this.props.table.title}
              </Typography>
            </Grid>
            <Grid item xs={3} align="center" className={classes.avatarContainer}>
              <Tooltip title="# guests seated here / Maximum guests in table">
                <Avatar className={classes.tableAvatar} style={{ backgroundColor: colorCode }}>
                  {sumGuests}/{this.props.table.maxGuests}</Avatar>
              </Tooltip>
            </Grid>
            <Grid item xs={3} align="right">
              <EditTableModal table={this.props.table}></EditTableModal>
              <IconButton aria-label="Delete" className={classes.iconButton} onClick={this.handleOpenDeleteTable} >
                <ClearIcon className={classes.icon} />
              </IconButton>
            </Grid>
            <Grid item xs={12} align="left">
              <Grid container spacing={0}>

                <Grid item xs={8} align="left">


                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.tableWrapper} >

          <Droppable droppableId={this.props.table._id} direction="horizontal">
            {(provided) => (
              <div
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
