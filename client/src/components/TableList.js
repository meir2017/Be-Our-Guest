import React, { Component } from 'react';
import '../App.css'
//import styled from 'styled-components'
import Table from './Table';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import {
    withStyles,
    Grid
} from '@material-ui/core';



const styles = theme => ({
    tableListWrapper: {
        width: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'nowrap',
    }

});

/* 
const Container = styled.div`
display: flex;
flex-direction: column;
width: auto;
transition: width 2s, height 4s;
flex: 1;
justify-content:space-around;
`; */

@inject("store")
@observer
class TableList extends Component {
    constructor(props) {
        super(props);
        // this.props.store.populateEvent();
    }


    render() {
        let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
        const { classes } = this.props;
        return (
            <div className={classes.tableListWrapper}>
                {currentEvent.tables.map((table, index) => (
                    <Table table={table} index={index} key={table._id} />
                ))}
            </div>

        );
    }
}

export default withStyles(styles)(TableList);