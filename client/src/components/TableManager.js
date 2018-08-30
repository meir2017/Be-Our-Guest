import React, { Component } from 'react';
import TableList from './TableList';
import GuestsList from './GuestsList';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%"
    },
});

export class TableManager extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
            <TableList />
            </div>
         
           
        );
    }
}



export default withStyles(styles)(TableManager);