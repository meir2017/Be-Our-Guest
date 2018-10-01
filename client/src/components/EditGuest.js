import React, { Component } from 'react';
import '../App.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyModal from './Modal';
import { observer, inject } from 'mobx-react';

import {
    Button,
    withStyles,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormHelperText,
    FormControl,
} from '@material-ui/core';

import CreateCategory from './CreateCategory';

const styles = theme => ({
    container: {
        margin: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        fontSize: 12
    },
    addIcon: {
        marginRight: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },

    addButton: {
        position: 'absolute',
        bottom: theme.spacing.unit * 10,
        right: theme.spacing.unit * 8,
        zIndex: 10
    },
});

@inject("store")
@observer
class CreateGuest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelEdit: "",
            name: "",
            email: "",
            phone: "",
            // category: "",
            // categoryName: "",
            invited: 0,
            coming: 0,
            notComing: 0
        };
        this.toggle = this.toggle.bind(this);
    }

    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    toggle() {
        this.props.modelEdit(this.props.guestIndex)
    }
    // handlerEditEven = (e) => {
    //     this.toggle();
    //     e.preventDefault();

    //     axios.post('/beOurGuest/editEvent/' + this.props.store.user.events[this.props.indexEvent]._id, this.state)
    //         .then(response => {
    //             // console.log(" edit event   =" + JSON.stringify(response.data))
    //             this.props.store.editEvent(response.data, this.props.indexEvent)
    //             this.props.store.ChangeMyEventPage(true)

    //         }).catch(err => console.log('Error: ', err));
    // }


    componentWillReceiveProps() {
        const index = this.props.guestIndex;
        const myGuest = this.props.store.user.events[this.props.store.eventIndex].guests[index];
        debugger
        if (index !== "" || myGuest !== undefined) {
            this.setState({
                // this.props.store.user.events[this.props.store.eventIndex].guests[index].globalGuest_id.name

                name: myGuest.globalGuest_id.name,
                email: myGuest.globalGuest_id.email,
                phone: myGuest.globalGuest_id.phone,
                // category: myGuest.categories,
                // categoryName: this.props.store.user.guests[index].categoryName,
                invited: myGuest.invited,
                coming: myGuest.coming,
                notComing: myGuest.numComing,
            }, () => {
                debugger
                this.setState({
                    modelEdit: this.props.modelEdit
                })
            })
        }
    }
    render() {
        let { classes } = this.props;
        return (
            <div>
                <Modal style={{ width: "320px" }} isOpen={this.state.modelEdit} toggle={this.toggle} className="CreateNewguest">
                    <form action="" onSubmit={this.handleSaveGuest}>
                        <ModalHeader toggle={this.toggle}>Create New Guest</ModalHeader>
                        <ModalBody>
                            <TextField
                                required
                                id="name" label="Name" type="text" className="textField"
                                name="name" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                            <TextField
                                required
                                id="email" label="Email" type="email" className="textField"
                                name="email" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                            <TextField

                                id="phone" label="Phone" type="text" className="textField"
                                name="phone" onChange={this.onChangeText} value={this.inputText}
                            />

                            <br />

                            <TextField

                                id="invited" label="Invited" inputProps={{ min: "1", max: "10", step: "1" }} type="number" className="textField"
                                name="invited" onChange={this.onChangeText} value={this.inputText}
                                required
                            />
                            <br />
                            <TextField

                                id="coming" label="Coming" type="number" className="textField"
                                name="coming" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                            <TextField
                                id="notComing" label="Not coming" type="number" className="textField"
                                name="notComing" onChange={this.onChangeText} value={this.inputText}
                            />
                            <FormControl required className={classes.formControl}  >
                                <InputLabel shrink htmlFor="category">category</InputLabel>
                                <div className={classes.container} style={{ width: "170px" }} >
                                    <Select

                                        required
                                        native
                                        label="Category"
                                        value={this.state.category}
                                        id="category"
                                        name="categoryName"
                                        onChange={this.handleChange} >
                                        <option disabled value="" />
                                        {this.props.store.user.categories.map((item, index) => {
                                            return <option key={item._id} value={item._id} data-name={item.name}>{item.name}</option>
                                        })}
                                    </Select>
                                    <CreateCategory />
                                </div>
                                <FormHelperText>Select category or create new</FormHelperText>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button size="small" variant="contained" color="secondary" type="Submit"> Save </Button>
                            <Button size="small" variant="contained" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}


CreateGuest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateGuest);


// select#category {
//   width: 200px;
// }