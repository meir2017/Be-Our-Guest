import React, { Component } from 'react';
import Table from './Table';

export class TableList extends Component {
    constructor(props) {
      super(props);
      this.state={
          tables: [],
      }
    }

    displayTables = () => {
        //the function display the tables[] in colomuns
    }

    render() {
        return (
            <div className="container">
                <Table />
                <div className="list-of-tables">
                    {/* displaying tables[] */}
                    {/* the user drag and drop guests from the GuestsList compoment into the div */}
                    {this.displayTables}
                </div>
            </div>
        );
    }
}

export default TableList;