import React, { Component } from 'react';
import '../App.css'
//import styled from 'styled-components'
import Table from './Table';
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
        // this.props.store.populateEvent();
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
        console.log("title  " + this.state.title + "    maxGuests " + this.state.maxGuests
            + "  category " + this.state.category)


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
                // this.props.store.addTable(response.data)
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
                    {currentEvent.tables.map((table, index) => (
                        <Table table={table} index={index} key={table._id} />
                    ))}
                </div>
                <div className="container">
                    <div className="addTable">
                        <Button variant="fab" style={{ float: "left", backgroundColor: "#00b0ff", zIndex: "-10px" }}
                            aria-label="Add"
                            aria-owns={open ? 'simple-popper' : null}
                            aria-haspopup="false"
                            onClick={this.handleClick}
                        >
                            <AddIcon />
                        </Button>

                        <Popover
                            id="simple-popper"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography style={{ padding: "20px" }}>
                                <input name="title" onChange={this.onChangeText} value={this.state.title} placeholder=" Table Name" type="text" /><br /><br />
                                <input name="maxGuests" onChange={this.onChangeText} value={this.state.maxGuests} placeholder="Max guests" type="number" /><br /><br />
                                <input name="category" onChange={this.onChangeText} value={this.state.category} placeholder="Category" type="text" /><br /><br />

                                {/* <input className="awesomplete" name="category" placeholder="categories" onSelect={this.onChangeText} list="mylist" /><br /> <br /> */}
                                {/* <datalist id="mylist" >
                                    
                                    {this.state.datalist.map((item, index) => {
                                        return <option key={index + item}>{item} </option>
                                    })}
                                </datalist> */}


                                {/* <input name="" onChange={} value={this.state.} placeholder="List of guest" type="text" /> <br /><br /> */}

                                <Button onClick={this.saveTable} variant="contained" size="medium" color="secondary">Save</Button>
                            </Typography>
                        </Popover>
                    </div>


                    {/* <div className="table-buttons">   
                        <button onClick={this.editTable}>Edit Table</button>
                        <button onClick={this.deleteTable}>Delete Table</button>
                    </div> */}
                    <br />
                    <br />
                    <br />

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