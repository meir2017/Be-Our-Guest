
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';



import Modal2 from './Modal';

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            Title: "",
            Date: "",
            Location: "",
            maxGuests: "",
            HostName: ""
        };

        this.toggle = this.toggle.bind(this);
    }

    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    saveEven = (e) => {
        this.toggle();
        e.preventDefault();


        axios.post('/beOurGuest/addNewEvent/' + this.props.UserId, this.state)
            .then(response => {
                console.log((response.data))
            })
            .catch(err => console.log('Error: ', err));
    }
    render() {
        return (
            <div>
                <br /><br />
                <Button color="danger" onClick={this.toggle}>new event</Button>
                {this.state.modal && <Modal2 >
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="CreateNewEvent">
                        <ModalHeader toggle={this.toggle}>Create New Event</ModalHeader>
                        <ModalBody>
                            <TextField
                                id="Title" label="Title" type="text" className="textField"
                                name="Title" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                            <TextField
                                id="Date" label="Date" type="date" className="textField"
                                name="Date" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                            <TextField
                                id="Location" label="Location" type="text" className="textField"
                                name="Location" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                            <TextField
                                id="maxGuests" label="maxGuests" type="number" className="textField"
                                name="maxGuests" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                            <TextField
                                id="HostName" label="HostName" type="text" className="textField"
                                name="HostName" onChange={this.onChangeText} value={this.inputText}
                            />
                            <br />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.saveEven}>Save event</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Modal2>}
            </div>
        );
    }
}

export default CreateEvent;

// Title: req.body.title,
// Date: req.body.Date,
// Location: req.body.location,
// maxGuests: req.body.numGuest,
// HostName: req.body.userName,