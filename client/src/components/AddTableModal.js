import React, { Component } from 'react';
import '../App.css'
import Table from './Table';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
    Select,
    FormControl,
    InputLabel,


} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        fontSize: 15
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
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
    },
    addButton: {
        position: 'absolute',
        bottom: theme.spacing.unit * 10,
        right: theme.spacing.unit * 8,

        zIndex: 10
    },
    addIcon: {
        marginRight: theme.spacing.unit,
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
            modal: false,
            category: ""

        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
        this.setState({ category: e.target.value });
        let category = this.props.store.user.categories.find(category => category._id === e.target.value);
        this.setState({ tableName: category.name });
        /*  let index = e.target.selectedIndex;
         this.setState({ tableName: e.target[index].text }) */
        // this.setState({ tableName: e.target.value })
    }

    addTable = (e) => {
        e.preventDefault();

        let store = this.props.store;
        let tableInfo = {
            title: this.state.tableName,
            maxGuests: this.state.tableSize,
            category: this.state.category,
        }

        axios.post('/beOurGuest/addTable/' + store.user.events[store.eventIndex]._id, tableInfo)
            .then(response => {

                // console.log(" new Table ->id  =" + response.data._id)
                this.props.store.addTable(response.data);

            })
            .catch(err => console.log('Error: ', err));

        // this.handleClose();
        this.toggle();

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
                            <FormControl className={classes.formControl} align="left">
                                <FormControl required>
                                    <InputLabel shrink htmlFor="category">Select category</InputLabel>
                                    <Select
                                        value={this.state.category}
                                        displayEmpty
                                        onChange={this.onChangeCategory}
                                        inputProps={{
                                            name: 'category',
                                            id: 'category',
                                        }}
                                        displayEmpty
                                        autoWidth
                                    >

                                        {this.props.store.user.categories.map((item, index) => {
                                            return <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
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
                                    required
                                    value={this.state.tableSize}
                                    placeholder="Enter number of places"
                                    onChange={this.handleTextChange}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal" />
                            </FormControl>
                        </form>
                    </DialogContent>
                    <Divider></Divider>
                    <DialogActions>
                        <Button size="small" onClick={this.handleClose}>Cancel</Button>
                        <Button size="small" color="secondary" onClick={this.addTable} > Save </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    modalAddTable = () => {
        const { classes } = this.props;

        return (
            <Modal style={{ width: "320px" }} isOpen={this.state.modal} toggle={this.toggle} className="CreateNewguest">
                <form action="" onSubmit={this.addTable}>
                    <ModalHeader toggle={this.toggle}> Create new table</ModalHeader>
                    <ModalBody>
                        <InputLabel htmlFor="category">category : </InputLabel>
                        <Select
                            required
                            native
                            label="Category"
                            value={this.state.category}
                            id="category"
                            name="categoryName"
                            onChange={this.onChangeCategory} >
                            <option disabled value="" />
                            {this.props.store.user.categories.map((item, index) => {
                                return <option key={item._id} value={item._id} data-name={item.name}>{item.name}</option>
                            })}
                        </Select>

                        <br />
                        <TextField
                            required
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
                            required
                            inputProps={{ min: "4", max: "20", step: "1" }}
                            value={this.state.tableSize}
                            placeholder="Between 4 and 20"
                            onChange={this.handleTextChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="Submit">Save </Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        )
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    {/* <Button variant="extendedFab" color="primary" aria-label="Add" onClick={this.handleClickOpen} className={classes.addButton}> */}

                    <Button variant="extendedFab" color="secondary" aria-label="Add" onClick={this.toggle} className={classes.addButton}>
                        <AddIcon className={classes.addIcon} />
                        Add Table
                    </Button>

                </div>
                {/* {this.dialogChildren()} */}
                {this.modalAddTable()}


            </div>
        );
    }
}

export default withStyles(styles)(AddTableModal);
