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
