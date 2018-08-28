import React, { Component } from 'react';
import TableList from './TableList';

export class TableManager extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <TableList />
            </div>
        );
    }
}

export default TableManager;