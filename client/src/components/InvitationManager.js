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
        //the function send invitation to selected guests emails
        //   let getAllGuest=this.props.store.events[this.store.eventIndex].guests// lest all guest

        let item = this.props.store
        let e_index = item.eventIndex;
        let i_Index = e.target.id;
        let event = item.user.events[e_index];
        let vet = event.invitations[i_Index];
        let vetId = vet._id;
        let guestId = "temid"

        let linkRsvp2 = `http://localhost:3000/beuorguest/rsvp/:${vetId}/:${event._id}/:${guestId}/`

        console.log("event._id: " + event._id);
        console.log("vetId: " + vetId);
        console.log("vetId: " + guestId);
        console.log("linkRsvp2: " + linkRsvp2);

        let guestName = "meir"; //globalGuest_id.name
        let email_gusest = "66meir46@gmail.com";   //globalGuest_id.email
        let eventName = vet.invitationName;
        let when = vet.whenEvent;
        let Where = vet.whereEvent;
        let userSend = item.user.username;
        // let linkRsvp = `http://localhost:3000/beuorguest/rsvp/:${vetId}/:${event._id}/:${when}/:${Where}/:${userSend}/:${guestName}/`

        // console.log("name gusest: " + guestName);
        // console.log("name email_gusest: " + email_gusest);
        // console.log("name eventName: " + eventName);
        // console.log("name when: " + when);
        // console.log("name Where: " + Where);
        // console.log("name userSend: " + userSend);
        // console.log("name linkRsvp: " + linkRsvp);
    }
    render() {

        const item = this.props.store;
        // console.log(item.user.events[item.eventIndex].invitations.length)
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
                                            <i className="far fa-trash-alt" id={index} onClick={this.removeInvitations}></i>

                                            <i className="fas fa-pencil-alt" id={index} onClick={this.editInvitations}></i>
                                            <i className="far fa-envelope" id={index} onClick={this.sendInvitations}></i>                                            </div>
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
