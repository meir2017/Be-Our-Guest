import React, { Component } from 'react';
import TableList from './TableList';
import GuestsList from './GuestsList';


export class TableManager extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <GuestsList />
                <TableList />
            </div>
        );
    }
}

export default TableManager;