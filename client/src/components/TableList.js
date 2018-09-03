import React, { Component } from 'react';
import '../App.css'
//import styled from 'styled-components'
import Table from './Table';
import Table0 from './Table0';
import AddTableModal from './AddTableModal'
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import {
    withStyles,
    Grid
}
    from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';


const styles = theme => ({
    tableListWrapper: {
        width: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'nowrap',
        overflow: 'auto',
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
        this.state = {
            title: '',
            maxGuests: '',
            category: '',
            anchorEl: null,
        }
        this.props.store.populateEvent();
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };
    onChangeText = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });

    }
    saveTable = (e) => {
        console.log("title  " + this.state.title + "    maxGuests " + this.state.maxGuests + "  category " + this.state.category)


        let tableInfo = {
            title: this.state.title,
            maxGuests: this.state.maxGuests,
            category: this.state.category,

        }
        let indexEvent = this.props.store.eventIndex;
        let eventId = this.props.store.user.events[indexEvent]._id
        axios.post(`/beOurGuest/createTable/${eventId}/`, tableInfo)
            .then(response => {
                console.log((response.data))
                this.props.store.addTable(response.data)
            })
        this.handleClose();
    }

    render() {
        let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
        // console.log(currentEvent.tables)
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <div className={classes.tableListWrapper}>
                    <AddTableModal></AddTableModal>
                    <Table0 index={-1} />
                    {currentEvent.tables.slice().sort(function (a, b) {
                        if (a.title < b.title) return -1;
                        if (a.title > b.title) return 1;
                        return 0;
                    }).map((table, index) => (
                        <Table table={table} index={index} key={table._id} />
                    ))}
                </div>

            </div>

        );
    }
}

// title: String,
// maxGuests: Number,
// categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
// guests: [{ type: Schema.Types.ObjectId, ref: 'guests' }]


export default withStyles(styles)(TableList);