
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MyModal from './Modal';

import { observer, inject } from 'mobx-react';


@inject("store")
@observer
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
        this.handlerSaveEven = this.handlerSaveEven.bind(this);

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

    handlerRemoveEvent = (e) => {

        //console.log(JSON.stringify(itemEvent))
        console.log((" Will be deleted  =" + e.target.name))
        let index = e.target.name;
        let eventId = this.props.store.user.events[index]._id;
        axios.delete(`/beOurGuest/RemovEvent/${this.props.store.user._Id}/${eventId}/`)
            .then(response => {
                console.log((response.data))
                this.store.RemovEvent(e.target.name)

            })

    }
    handlerSaveEven = (e) => {
        this.toggle();
        e.preventDefault();
        console.log(this.props.store.user.UserId)
        axios.post('/beOurGuest/addNewEvent/' + this.props.store.user._Id, this.state)
            .then(response => {

                console.log(" new event id  =" + response.data._id)
                this.props.store.AddEvent(response.data)

            })
            .catch(err => console.log('Error: ', err));
    }
    render() {
        return (
            <div>
                <br /><br />

                <Button color="danger" onClick={this.toggle}>new event</Button>
                <br /> <br />
                {this.state.modal && <MyModal >
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
                            <Button color="primary" onClick={this.handlerSaveEven}>Save event</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </MyModal>}
                {this.props.store.user.events.map((eve, index) => {
                    return (
                        <div key={eve.HostName + eve.Location} index={index} className="eventAll">
                            <Button className="btnEvent" name={index}  >{eve.Title} <b>In </b>   {eve.Location}</Button>
                            <br /> <br />
                        </div>
                    )
                })}

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