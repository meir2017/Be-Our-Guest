import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Invitation from './Invitation';


export class InvitationManager extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div className="container">
                <Invitation />
                <div className="invites-list">
                <h4>Invites</h4>
                    <p>Save the Date</p>
                    <p>Invitations Reminder</p>
                </div>
                <div className="new-button">
                    <Button color="primary">New Invitation</Button>
                </div>  
            </div>
        );
    }
}

export default InvitationManager;