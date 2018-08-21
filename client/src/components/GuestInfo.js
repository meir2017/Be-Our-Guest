import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class GuestInfo extends Component {

    rowData = (guest, index) => {
        return (
            <tr key={index}>
                <td>{guest.name}</td>
                <td>{guest.email}</td>
                <td>{guest.phone}</td>
                <td>{guest.numConfirmed}</td>
                <td>{guest.numUndecided}</td>
                <td>{guest.numNotComing}</td>
            </tr>
        )
    };

    render() {
        let guests = this.props.store.user.guests;
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone #</th>
                        <th>Confirmed</th>
                        <th>Undecided</th>
                        <th>Not Coming</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map((guest,index) => 
                        <tr key={index}>
                            {this.rowData(guest, index)}
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}

export default GuestInfo;