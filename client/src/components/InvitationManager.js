import React, { Component } from 'react';
import Invitation from './Invitation';
import { observer, inject } from 'mobx-react';
import axios from 'axios';


@inject("store")
@observer
class InvitationManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations: [],
            num: 0,
        }
    }

    displayInvitationFormats = () => {
        //the function display modal checklist of exiting texts
        //for this purpose we need to save in store example of texts like Save the Date
    }

    removeInvitations = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        ///beOurGuest/removeInvitation/:eventId/:eventIndex/:index/
        let eventIndex = this.props.store.eventIndex;
        let eventId = this.props.store.user.events[eventIndex]._id;
        let index = e.target.id;

        axios.delete(`/beOurGuest/removeInvitation/${eventId}/${eventIndex}/${index}`)
            .then(response => {
                console.log("remove Invitation")
                console.log((response.data))
                this.props.store.removeInvitation(index)
            })
    }
    editInvitations = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        this.props.store.theInvitationIndex(e.target.id)
        this.setState({ num: this.state.num + 1 })
    }


    sendInvitations = (e) => {
        this.props.store.theInvitationIndex(e.target.id)
        let item = this.props.store
        let e_index = item.eventIndex;
        let i_Index = e.target.id;
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
        // let linkRsvp = `http://localhost:3000/beuorguest/rsvp/${vetId}/${event._id}/`

        axios.post(`/beOurGuest/rsvpEmail/${vetId}/${event._id}/`, invet)
            .then(response => {
                console.log("send all email ")
                console.log((response.data))
            })
    }
    render() {

        const item = this.props.store;
        return (
            <div className="container">

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
                                        

                                            <i className="far fa-envelope" id={index} onClick={this.sendInvitations}></i> 
                                            
                                            <i className="fas fa-pencil-alt" id={index} onClick={this.editInvitations}></i> 
                                            <i className="far fa-trash-alt" id={index} onClick={this.removeInvitations}></i>                                          </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="col-sm-6">
                        <Invitation num={this.state.num} />
                    </div>
                </div>
            </div>
        );
    }
}


export default InvitationManager;  
