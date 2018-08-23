import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class Invitation extends Component {
    constructor(props) {
      super(props);
      this.state = {
          titleInput: '',
          emailInput: '',
          guests: [],
          files: [],
        }

        // const InvitationBodyStyle = [
        //     summer = {
        //     backgroundColor:'lightblue',
        //         fontSize: '15px',
        //         textAlign: 'center',
        //         fontFamily: 'Ariel',
        //     },
        //     calm = {
        //     backgroundColor:'lightblue',
        //         fontSize: '15px',
        //         textAlign: 'center',
        //         fontFamily: 'Ariel',
        //     },
        //     party = {
        //     backgroundColor:'lightblue',
        //         fontSize: '15px',
        //         textAlign: 'center',
        //         fontFamily: 'Ariel',
        //     },
        // ]

    }

    SelectStyle = () => {
        // the function display list of invitation styles
    }

    handleTitleInput = (e) => {
        this.setState({titleInput: e.target.value})
        };

    handleEmailInput = (e) => {
        this.setState({emailInput: e.target.value})
        };

    handleGuests = () => {
        let prevState = '';
        if(prevState.guests != this.state.guests){
           //the function open pop up checklist guests
        }
    }

    deleteFile = () => {
           //the function delete the file from invitation
    }

    attachFile = () => {
        //the function attach file to invitation
    }

    saveInvitation = () => {
        //the function save invitation into invitations []
    }

    sendInvitation = () => {
        //the function send invitation to selected guests emails
    }

    render() {
        return (
            <div className="container">
                <h4>Write your invitation</h4>
                <div className="invitation-body">
                    <input type="text" className="title" placeholder="Title" onChange={this.handleTitleInput} value={this.state.titleInput}/>
                    <input type="text" className="text" placeholder="Invitation text" onChange={this.handleEmailInput} value={this.state.emailInput}/>
                </div>
                <div className="display-invitation-input" type="text" style={{ border: '2px solid black' }}>
                    <h2>{this.state.titleInput}</h2>
                    <h4>{this.state.emailInput}</h4>
                </div>
                <div className="invitation-buttons">
                    <Button color="primary" onClick={this.SelectStyle}>Select Style</Button>
                    <Button color="primary" onClick={this.attachFile}>Attach file</Button>
                    <Button color="danger" onClick={this.deleteFile}>Delete file</Button>
                    <Button color="primary" onClick={this.handleGuests}>Select Guests</Button>
                    <Button color="primary" onClick={this.saveInvitation}>Save</Button>
                    <Button color="success" onClick={this.sendInvitation}>Send</Button>
                </div>
                
            </div>
        );
    }
}

export default Invitation;