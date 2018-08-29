import React, { Component } from 'react';
import Invitation from './Invitation';
import { observer, inject } from 'mobx-react';


@inject("store")
@observer
class InvitationManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations: [],
        }
    }

    displayInvitationFormats = () => {
        //the function display modal checklist of exiting texts
        //for this purpose we need to save in store example of texts like Save the Date
    }

    displayInvitationsList = () => {
        //the function display invitations[]
    }

    render() {

        const item = this.props.store;
        // console.log(item.user.events[item.eventIndex].invitations.length)
        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-5">
                        You have {item.user.events[item.eventIndex].invitations.length} invitations
                            {/* Your Invitation List */}
                        <br />
                        <br />
                        <br />
                        {item.user.events[item.eventIndex].invitations.map((vet, index) => {
                            return <p key={index} nmae={vet.invitationName}>{vet.invitationName}</p>
                        })}
                    </div>
                    <div className="col-sm-7">
                        <Invitation />
                    </div>
                </div>


                {/* <div className="invitation-list">
                    <h4>Your Invitation List</h4>
                    display invitations[]
                </div>

                the invitation-formats div is pop up
                <div className="invitation-formats">
                    <button onClick={this.displayInvitationFormats}>Other Invitation Formats</button>
                    <p>Save the Date!</p>
                    <p>Attached this text to invitation {this.state.invitations['']}</p>
                </div> */}

            </div>
        );
    }
}


export default InvitationManager;  
