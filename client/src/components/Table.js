import React, { Component } from 'react';

export class Table extends Component {
    constructor(props) {
      super(props);
      this.state= {
        tableSize: '',
        category: [],
        tableName: '',
        listOfGuests: [],
      }
    }

    saveTable = () => {
        //the function create new table and save it to tables[]
        //call the displayTable func
    }

    displayTable = () => {
        //display the added table in new div
    }

    deleteTable = () => {
        //the function delete table from tables[]
    }

    editTable = () => {
        //the function open table-details div
    }

    render() {
        return (
            <div className="container">
                    <div className="table-details">
                        <p>Table Name:</p>
                        <input />
                        <p>Size:</p>
                        <input />
                        <p>Categories:</p>
                        <input />
                        <p>List of guests:</p>
                        <input />
                        <button onClick={this.saveTable}>Save Table</button>
                    </div>
                    <div className="table-buttons">   
                        <button onClick={this.editTable}>Edit Table</button>
                        <button onClick={this.deleteTable}>Delete Table</button>
                    </div>
            </div>
        );
    }
}

export default Table;