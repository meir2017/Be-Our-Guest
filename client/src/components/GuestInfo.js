import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import CreateGuest from './CreateGuest.js';
import PropTypes from 'prop-types';
import {
  withStyles,
  Paper,
  IconButton,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 1000,
  },
  iconButton: {
    height: 35,
    width: 35,


  },
  icon: {
    height: 20,
    width: 20,

  },

});

@inject("store")
@observer
class GuestInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreate: false,
      endpoint: "http://127.0.0.1:3001",

    };
  }

  openModalCreate = (e) => {
    this.setState({ modalCreate: !this.state.modalCreate });
  }

  handleRemoveGuest = (e, index) => {
    e.preventDefault();
    // console.log((" Will be deleted  =" + e.target.id))
    let guestId = this.props.store.user.events[this.props.store.eventIndex].guests[index]._id;
    let eventId = this.props.store.user.events[this.props.store.eventIndex]._id;
    axios.delete(
      '/beOurGuest/removeGuest/' + eventId + '/' + guestId + '/' + index)
      .then(response => {
        console.log((response.data));
        this.props.store.removeGuest(index);
        if (response.data != null) {
          this.props.store.updateTableById(response.data);
        }
      })
  }

  handleEdit = (e, index) => {
    e.preventDefault();
    alert("index: " + index);
  }

  createData = (id, name, email, phone, coming, undecided, notComing) => {
    return { id, name, email, phone, coming, undecided, notComing };
  }

  rowData = (guest, index) => {
    return (
      this.createData(index, guest.name, guest.email, guest.phone, guest.coming, guest.undecided, guest.notComing)
    )
  };

  displayCategoryName = guest => {
    let categoryInfo = this.props.store.user.categories.find(category =>
      category._id === guest.categories[0]);
    return categoryInfo.name;
  }
  render() {

    let { classes } = this.props;
    let guests = this.props.store.user.events[this.props.store.eventIndex].guests;
    return (

      <div className="GuestsTabContainer">
        <div className="addGuest" style={{textAlign:'center'}}>
          <CreateGuest
            openModalCreate={this.openModalCreate}
            modalCreate={this.state.modalCreate}
          />
        </div>

        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Category</TableCell>
                <TableCell numeric>Coming</TableCell>
                <TableCell numeric>Not coming</TableCell>
                <TableCell numeric>Undecided</TableCell>
                {/* <TableCell>Comment</TableCell> */}
                <TableCell>Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guests.map((guest, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {guest.globalGuest_id.name}
                    </TableCell>
                    <TableCell>{guest.globalGuest_id.email}</TableCell>
                    <TableCell>{guest.globalGuest_id.phone}</TableCell>
                    <TableCell>{this.displayCategoryName(guest)}</TableCell>
                    <TableCell numeric>{guest.numComing}</TableCell>
                    <TableCell numeric>{guest.numNotComing}</TableCell>
                    <TableCell numeric>{guest.numInvited - guest.numComing - guest.numNotComing}</TableCell>
                    {/* <TableCell>{guest.comment}</TableCell> */}
                    <TableCell>
                      <IconButton aria-label="Edit" className={classes.iconButton} onClick={(e) => this.handleEdit(e, index)}>
                        <EditIcon className={classes.icon} />
                      </IconButton>
                      <IconButton aria-label="Delete" className={classes.iconButton} onClick={(e) => this.handleRemoveGuest(e, index)} >
                        <ClearIcon className={classes.icon} />
                      </IconButton>

                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

      </div>
    );
  }
}

GuestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuestInfo);
