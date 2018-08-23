import React, { Component } from 'react';
import Invitation from './Invitation';
  
export class InvitationManager extends Component {
    constructor(props) {
      super(props);
      this.state={
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
        return (
            <div className="container">

                <Invitation />

                <div className="invitation-list">
                    <h4>Your Invitation List</h4>
                    {/* display invitations[] */}
                </div>

                {/* the invitation-formats div is pop up */}
                <div className="invitation-formats">
                    <button onClick={this.displayInvitationFormats}>Other Invitation Formats</button>
                    {/* <p>Save the Date!</p> */}
                    {/* <p>Attached this text to invitation {this.state.invitations['']}</p> */}
                </div>    

            </div>
        );
    }
}


export default InvitationManager;  
