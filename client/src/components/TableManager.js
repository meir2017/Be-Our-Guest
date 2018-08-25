import React, { Component } from 'react';
import TableList from './TableList';

export class TableManager extends Component {
    render() {
        return (
            <div className="container">
                <TableList />
            </div>
        );
    }
}

export default TableManager;