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
            tableSize: '',
            category: "",
            tableName: '',
            listOfGuests: "",
            anchorEl: null,
            datalist: ["node.js", "Java", "JavaScript", "c", "c++", "html", "Component", "react"]
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
        console.log("tableName  " + this.state.tableName + "    category " + this.state.category
            + "  tableSize " + this.state.tableSize + "   color " + this.state.color);
        this.handleClose();
    }

    render() {
        let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
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
                                <input name="tableName" onChange={this.onChangeText} value={this.state.tableName} placeholder=" Table Name" type="text" /><br /><br />
                                <input name="tableSize" onChange={this.onChangeText} value={this.state.tableSize} placeholder="size" type="number" /><br /><br />
                                <span >Color Table:  </span> <input style={{ marginLeft: "30px" }} type="color" name="color" onChange={this.onChangeText} id="" /><br /><br />
                                <input className="awesomplete" name="category" placeholder="category" onSelect={this.onChangeText} list="mylist" /><br /> <br />
                                <datalist id="mylist" >

                                    {/* list of category */}
                                    {this.state.datalist.map((item, index) => {
                                        return <option key={index + item}>{item} </option>
                                    })}
                                </datalist>
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

export default withStyles(styles)(TableList);