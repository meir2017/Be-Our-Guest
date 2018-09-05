import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import CreateGuest from './CreateGuest.js';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Paper } from "@material-ui/core"
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

@inject("store")
@observer
class GuestInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreate: false
    };
  }

  openModalCreate = (e) => {
    this.setState({ modalCreate: !this.state.modalCreate });
  }

  handleRemoveGuest = (e) => {
    e.preventDefault();
    // console.log((" Will be deleted  =" + e.target.id))
    let index = e.target.id;
    let guestId = this.props.store.user.events[this.props.store.eventIndex].guests[index]._id;
    let eventId = this.props.store.user.events[this.props.store.eventIndex]._id;
    axios.delete(
      '/beOurGuest/removeGuest/' + eventId + '/' + guestId + '/' + index)
        .then(response => {
          console.log((response.data));
          this.props.store.removeGuest(index);
        })
  }

  handleEdit = (e) => {
    e.preventDefault();
    alert("e.target.id; " + e.target.id);
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

    let guests = this.props.store.user.events[this.props.store.eventIndex].guests;
    return (

      <div className="container">
        <div className="addGuest">
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
                <TableCell>Categoty</TableCell>
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
                      <i className="material-icons" id={index} onClick={this.handleEdit}>
                        border_color
                      </i>
                      <i className="material-icons" id={index} onClick={this.handleRemoveGuest}>
                        delete
                      </i>
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
