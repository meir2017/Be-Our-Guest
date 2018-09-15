import React, { Component } from 'react';
import Invitation from './Invitation';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withStyles, IconButton, Icon } from "@material-ui/core";
import PropTypes from 'prop-types';

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
        this.props.store.theInvitationIndex(null);

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
        const { classes } = this.props;
        return (

            <div>
                <div className="row">
                    <div className="col-sm-6">
                        You have {item.user.events[item.eventIndex].invitations.length} invitations
                        <br />
                        <br />
                        <div className="listinvitations" style={{ height: '100%', textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
                            {item.user.events[item.eventIndex].invitations.map((vet, index) => {
                                return (
                                    <div className="iteminvitations container">
                                        <div name={index} key={vet.invitationName + index} className="row">

                                            <div className="col-sm-7 text2"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center', /* align horizontal */
                                                    alignItems: 'center'
                                                }}>{vet.invitationName}</div>
                                            <div className="col-sm-5 btnicon" style={{ textAlign: 'right' }}>
                                                <IconButton className={classes.iconButton}>
                                                    <Icon id={index} onClick={this.editInvitations} className={classes.icon}>edit_icon</Icon>
                                                </IconButton>
                                                <IconButton className={classes.iconButton}>
                                                    <Icon id={index} onClick={e => { this.myIndex(e); this.toggleSend() }} className={classes.icon}>email_icon</Icon>
                                                </IconButton>
                                                <IconButton className={classes.iconButton}>
                                                    <Icon id={index} onClick={e => { this.myIndex(e); this.toggleRemove() }} className={classes.icon}>clear_icon</Icon>
                                                </IconButton>
                                            </div>
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

                <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.modal} toggle={this.toggleSend} >
                    <ModalHeader toggle={this.toggleSend}>Do you want to send an invitation to all your guests</ModalHeader>
                    <ModalFooter>
                        <Button style={{ backgroundColor: '#560027' }} onClick={this.sendInvitations}>Send</Button>{' '}
                        <Button color="secondary" onClick={this.toggleSend}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div>
                    <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.modalRemove} toggle={this.toggleRemove}>
                        <ModalHeader toggle={this.toggle}>Do you want to delete this invitation?</ModalHeader>
                        <ModalFooter className="btnSend" >
                            <Button onClick={this.removeInvitations} style={{ backgroundColor: '#560027' }}>Yes</Button>
                            <Button onClick={this.toggleRemove} color="secondary" >No</Button>
                        </ModalFooter>

                    </Modal>
                </div>
            </div>



        );
    }
}

InvitationManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InvitationManager);

