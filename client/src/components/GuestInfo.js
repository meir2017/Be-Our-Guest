import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import CreateGuest from './CreateGuest.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  createData = (id, name, email, phone, coming, undecided, notComing) => {
    return { id, name, email, phone, coming, undecided, notComing };
  }

  rowData = (guest, index) => {
    return (
      this.createData(index, guest.name, guest.email, guest.phone, guest.coming, guest.undecided, guest.notComing)
    )
  };

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
                <TableCell numeric>Coming</TableCell>
                <TableCell numeric>Not coming</TableCell>
                <TableCell numeric>Undecided</TableCell>
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
                    <TableCell >{guest.numConfirmed}</TableCell>
                    <TableCell >{guest.numNotComing}</TableCell>
                    <TableCell >{guest.numUndecided}</TableCell>
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
