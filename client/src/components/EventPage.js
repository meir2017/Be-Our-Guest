
import React, { Component } from 'react';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import axios from 'axios';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withStyles, IconButton, Icon } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import { observer, inject } from 'mobx-react';
const styles = theme => ({
    icon: {
        color: 'white',
        fontSize: 20
    },
    iconButton: {
        height: 35,
        width: 35
    }
});
@inject("store")
@observer
class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            myEvent: null,
        }

    }
    myIndex = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        // this.props.store.thisEventIndex(e.target.id)

        this.setState({ myEvent: e.target.id })

    }
    handleEvent = (index) => {
        this.props.store.thisEventIndex(index)
        this.props.store.ChangeMyEventPage(true)

    }
    openModalCreate = (e) => {
        this.setState({ modalCreate: !this.state.modalCreate });
        // this.handleClose(e);
    }
    openEditeEvent = (index) => {
        console.log(index)
        this.setState({ myEvent: index }, () => {
            this.setState({ modalEdit: !this.state.modalEdit })
        });
    }





    toggleRemove = () => {
        // this.handleClose(e)
        this.setState({
            modalRemove: !this.state.modalRemove
        });
    }
    handlerRemoveEvent = (e) => {
        e.preventDefault();
        console.log(e)
        let index = this.state.myEvent;

        let eventId = this.props.store.user.events[index]._id;
        console.log("index  " + index)
        console.log("eventId  " + eventId)
        axios.delete(`/beOurGuest/removEvent/${this.props.store.user._Id}/${eventId}/${index}/`)
            .then(response => {
                console.log((response.data))
                this.props.store.removEvent(index)
            })
        // this.handleClose(e)
        this.props.store.thisEventIndex(null)
        this.toggleRemove();
    }
    render() {
        const item = this.props.store;
        const { classes } = this.props;

        // console.log(JSON.stringify(this.props.store.user.events))
        return (
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="eventPage col-sm-4">
                    <br />
                    <br />
                    <br />
                    <div className="addEvent">
                        {/* <Button color="#212121">meir</Button> */}
                        <button type="button" className="AddEvent" onClick={this.openModalCreate} >Add Event</button>
                    </div>
                    <div className="myEvent">
                        {this.props.store.user.events.map((eve, index) => {
                            return (
                                <div className="iteminvitations container" style={{ cursor: 'pointer' }}>
                                    <div name={index} key={eve.HostName + eve.Location + index} className="row">
                                        <div className="col-sm-7 text2"
                                            id={index} onClick={(e) => { this.handleEvent(index) }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center', /* align horizontal */
                                                alignItems: 'center'
                                            }}>
                                            {eve.Title}
                                        </div>
                                        <div className="col-sm-5 btnicon" style={{ textAlign: 'right' }}>
                                            <IconButton className={classes.iconButton}>
                                                <Icon id={index} onClick={e => { this.openEditeEvent(e.target.id) }} id={index} className={classes.icon}>edit_icon</Icon>
                                            </IconButton>
                                            <IconButton className={classes.iconButton}>
                                                <Icon id={index} onClick={e => { this.myIndex(e); this.toggleRemove() }} id={index} className={classes.icon}>clear_icon</Icon>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <CreateEvent openModalCreate={this.openModalCreate}
                    modalCreate={this.state.modalCreate} />
                <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.modalRemove} >
                    <ModalHeader toggle={this.toggleRemove}>Do you want to delete this event?</ModalHeader>
                    <ModalFooter className="btnSend" >
                        <Button color="secondary" variant="contained" onClick={this.handlerRemoveEvent}>Yes</Button>
                        <Button variant="contained" onClick={this.toggleRemove} className={classes.cancelButton}>No</Button>

                    </ModalFooter>

                </Modal>
                <EditEvent openEditeEvent={this.openEditeEvent}
                    modalEdit={this.state.modalEdit}
                    indexEvent={this.state.myEvent} />


                {/* {this.state.myEvent && <EditEvent openEditeEvent={this.openEditeEvent}
                    modalEdit={this.state.modalEdit}
                    indexEvent={this.state.myEvent} />} */}

                <div>
                    <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.modalRemove} >
                        <ModalHeader toggle={this.toggleRemove}>Do you want to delete this event?</ModalHeader>
                        <ModalFooter className="btnSend" >
                            <Button color="secondary" variant="contained" onClick={this.handlerRemoveEvent}>Yes</Button>
                            <Button variant="contained" onClick={this.toggleRemove} className={classes.cancelButton}>No</Button>

                        </ModalFooter>

                    </Modal>
                </div>


            </div>
        );
    }
}


export default withStyles(styles)(EventPage);

// export default EventPage;