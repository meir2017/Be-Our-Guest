import React, { Component } from 'react';
import '../App.css'
//import styled from 'styled-components'
import Table from './Table';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    withStyles,
    Typography,
    Popover,
    Icon,
    NavigationIcon,
    Divider,
    MenuItem,
    TextField,
    Select

} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
    tableListWrapper: {
        width: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'nowrap',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        fontSize: 15
    },
    menu: {
        width: 200,
    },
    button: {
        backgroundColor: '#4A6572',
        // margin: theme.spacing.unit,
        width: 160,
        fontSize: 13,
    },
    iconSmall: {
        fontSize: 15,
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

@inject("store")
@observer
class AddTableModal extends Component {
    constructor() {
        super();
        this.state = {
            tableName: '',
            tableSize: '',
            categories: [],
            Guests: [],
            open: false,
            datalist: ["node.js", "Java", "JavaScript", "c", "c++", "html", "Component", "react"],
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            tableName: '',
            tableSize: "",
            category: '',
            Guests: [],
            open: false
        });
    };

    handleTextChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onChangeCategory = e => {
        this.setState({ [e.target.id]: e.target.value})
       // this.setState({ tableName: e.target.value })
    }

    addTable = () => {
        let store = this.props.store;
        let tableInfo = {
            title : this.state.tableName,
            maxGuests: this.state.tableSize,
            category: this.state.category,
        }

        axios.post('/beOurGuest/addTable/' + store.user.events[store.eventIndex]._id, tableInfo)
        .then(response => {
    
          console.log(" new Table ->id  =" + response.data._id)
          this.props.store.addTable(response.data)
    
        })
        .catch(err => console.log('Error: ', err));
        ;
        this.handleClose();

    }

    // categoryReference = elem => {
    //     this.inputElem = elem;
    // }

    // categoryChange = (event) => {
    //     this.setState({ category: event.target.value });
    // }

    // handleChange = name => event => {
    //     this.setState({
    //         [name]: event.target.value,
    //     });
    // };

    dialogChildren = () => {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">
                        Create new table
                    </DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off" align="center">
                            <TextField
                                id="tableName"
                                label="Table name"
                                type="text"
                                className={classes.textField}
                                value={this.state.tableName}
                                placeholder="Enter table name"
                                onChange={this.handleTextChange}
                                margin="normal" />
                            <TextField
                                id="tableSize"
                                label="Max number of guests"
                                type="number"
                                value={this.state.tableSize}
                                placeholder="Enter number of pleces"
                                onChange={this.handleTextChange}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal" />
                            <Select
                                native
                                value={this.state.category}
                                id="category"
                                onChange={this.onChangeCategory} >
                                <option value="Category" />
                                {this.props.store.user.categories.map((item, index) => {
                                    return <option key={item._id} value={item._id} 
                                    onClick={()=> { this.setState({tableName: item.name})}}>{item.name}</option>
                                })}
                            </Select>
                        </form>
                    </DialogContent>
                    <Divider></Divider>
                    <DialogActions>
                        <Button size="small" onClick={this.handleClose}>Cancel</Button>
                        <Button size="small" color="primary" onClick={this.addTable} > Save </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClickOpen}>
                        <AddIcon />
                    </Button>
                </div>
                {this.dialogChildren()}
            </div>
        );
    }
}

export default withStyles(styles)(AddTableModal);
