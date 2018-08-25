import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

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

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


@inject("store")
@observer
class GuestInfo extends Component {
  constructor(props) {
    super(props);
  }

  createData = (id, name, email, phone, coming, undecided, notComing) => {
    return { id, name, email, phone, coming, undecided, notComing };
  }
  
  rowData = (guest, index) => {
    return (
      this.createData(index, guest.name, guest.email, guest.phone, guest.coming, guest.undecided, guest.notComing )
    )
};

  render() {
    let guests = this.props.store.user.guests;
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell numeric>Coming</TableCell>
              <TableCell numeric>Undecided</TableCell>
              <TableCell numeric>Not coming</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest,index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {guest.name}
                  </TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell numeric>{guest.coming}</TableCell>
                  <TableCell numeric>{guest.invited - guest.coming - guest.notComing}</TableCell>
                  <TableCell numeric>{guest.notComing}</TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

GuestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuestInfo);

// @inject("store")
// @observer
// class GuestInfo extends Component {
//     createSortHandler = property => event => {
//         this.props.onRequestSort(event, property);
//     };

//     rowData = (guest, index) => {
//         return (
//             <tr key={index}>
//                 <td>{guest.name}</td>
//                 <td>{guest.email}</td>
//                 <td>{guest.phone}</td>
//                 <td>{guest.numConfirmed}</td>
//                 <td>{guest.numUndecided}</td>
//                 <td>{guest.numNotComing}</td>
//             </tr>
//         )
//     };

//     render() {
//         const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

//         let guests = this.props.store.user.guests;
//         return (
//             <TableHead>
//                 <TableRow>
//                     <TableCell padding="checkbox">
//                         <Checkbox
//                             indeterminate={numSelected > 0 && numSelected < rowCount}
//                             checked={numSelected === rowCount}
//                             onChange={onSelectAllClick}
//                         />
//                     </TableCell>
//                     {rows.map(row => {
//                         return (
//                             <TableCell
//                                 key={row.id}
//                                 numeric={row.numeric}
//                                 padding={row.disablePadding ? 'none' : 'default'}
//                                 sortDirection={orderBy === row.id ? order : false}
//                             >
//                                 <Tooltip
//                                     title="Sort"
//                                     placement={row.numeric ? 'bottom-end' : 'bottom-start'}
//                                     enterDelay={300}
//                                 >
//                                 <TableSortLabel
//                                     active={orderBy === row.id}
//                                     direction={order}
//                                     onClick={this.createSortHandler(row.id)}
//                                 >
//                                     {row.label}
//                                 </TableSortLabel>
//                                 </Tooltip>
//                             </TableCell>
//                         );
//                     }, this)}
//                 </TableRow>
//             </TableHead>
//         );

//         return (
//             <Table striped bordered condensed hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone #</th>
//                         <th>Confirmed</th>
//                         <th>Undecided</th>
//                         <th>Not Coming</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {guests.map((guest,index) => 
//                         <tr key={index}>
//                             {this.rowData(guest, index)}
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//         );
//     }
// }

// export default GuestInfo;