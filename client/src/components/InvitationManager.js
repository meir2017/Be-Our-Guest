import React, { Component } from 'react';
import Invitation from './Invitation';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



@inject("store")
@observer
class InvitationManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations: [],
            num: 0,
            modal: false,
            modalEmail: false,
            modalRemove: false,
            indexInvitations: ""
        }
    }

    myIndex = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        this.props.store.theInvitationIndex(e.target.id)
    }

    toggleRemove = () => {
        this.setState({
            modalRemove: !this.state.modalRemove
        });
    }

    removeInvitations = () => {
        console.log(this.props.store.invitationIndex)
        ///beOurGuest/removeInvitation/:eventId/:eventIndex/:index/
        let eventIndex = this.props.store.eventIndex;
        let eventId = this.props.store.user.events[eventIndex]._id;
        let index = this.props.store.invitationIndex;

        axios.delete(`/beOurGuest/removeInvitation/${eventId}/${eventIndex}/${index}`)
            .then(response => {
                console.log("remove Invitation")
                console.log((response.data))
                this.props.store.removeInvitation(index)
            })
        this.toggleRemove();

    }
    editInvitations = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        this.props.store.theInvitationIndex(e.target.id)
        this.setState({ num: this.state.num + 1 })
    }


    // toggleSendEmail = () => {
    //     this.setState({
    //         modalEmail: !this.state.modalEmail
    //     });
    // }
    toggleSend = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    sendInvitations = () => {
        let item = this.props.store
        let e_index = item.eventIndex;
        // let i_Index = e.target.id;
        let i_Index = this.props.store.invitationIndex;
        let event = item.user.events[e_index];
        let vet = event.invitations[i_Index];
        let vetId = vet._id;
        let guestId = "temid"
        let getAllGuest = event.guests

        console.log(JSON.stringify(getAllGuest))
        let invet = event.invitations[i_Index];
        console.log(invet.fontBody)
        console.log(JSON.stringify(invet))
        let linkRsvp2 = `http://localhost:3000/beuorguest/rsvp/${vetId}/${event._id}/${guestId}/`
        console.log(linkRsvp2)

        axios.post(`/beOurGuest/rsvpEmail/${vetId}/${event._id}/`, invet)
            .then(response => {
                console.log("send all email ")
                console.log((response.data))
            })
        this.toggleSend();

    }
    render() {

        const item = this.props.store;
        return (

            <div>
                <div className="row">
                    <div className="col-sm-6">
                        You have {item.user.events[item.eventIndex].invitations.length} invitations
                        <br />
                        <br />
                        <div className="listinvitations">
                            {item.user.events[item.eventIndex].invitations.map((vet, index) => {
                                return (

                                    <div name={index} key={vet.invitationName + index} className="row iteminvitations">
                                        <div className="col-sm-7 text2">{vet.invitationName}</div>
                                        <div className="col-sm-5 btnicon">
                                            <i className="far fa-trash-alt" id={index} onClick={e => { this.myIndex(e); this.toggleRemove() }}></i>

                                            <i className="fas fa-pencil-alt" id={index} onClick={this.editInvitations}></i>
                                            <i className="far fa-envelope" id={index} onClick={e => { this.myIndex(e); this.toggleSend() }}></i>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="col-sm-6">
                        <Invitation num={this.state.num} />
                    </div>
                </div>
                {/* <div>
                    <Modal isOpen={this.state.modalEmail} toggle={this.toggleSendEmail}>
                        <ModalHeader toggleSendEmail={this.toggleSendEmail}>Do you want to send an invitation to all your guests</ModalHeader>
                        <ModalFooter className="btnSend" >
                            <Button onClick={this.sendInvitations} color="primary">Send</Button>
                            <Button onClick={this.toggleSendEmail} color="secondary" style={{ marginLeft: "40px" }}>Cancel</Button>
                        </ModalFooter>

                    </Modal>
                </div> */}
                <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.modal} toggle={this.toggleSend} >
                    <ModalHeader toggle={this.toggleSend}>Do you want to send an invitation to all your guests</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={this.sendInvitations}>Send</Button>{' '}
                        <Button color="secondary" onClick={this.toggleSend}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div>
                    <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.modalRemove} toggle={this.toggleRemove}>
                        <ModalHeader toggle={this.toggle}>Do you want to delete this invitation?</ModalHeader>
                        <ModalFooter className="btnSend" >
                            <Button onClick={this.removeInvitations} color="primary">Yes</Button>
                            <Button onClick={this.toggleRemove} color="secondary" style={{ marginLeft: "40px" }}>No</Button>
                        </ModalFooter>

                    </Modal>
                </div>
            </div>



        );
    }
}



export default InvitationManager;  
