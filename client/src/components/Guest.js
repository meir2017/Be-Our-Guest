import React, { Component } from 'react';

export class Guest extends Component {
    constructor(props) {
      super(props);
      this.state= {
        category: [],
        numOfInvites: '',
        status: '',        
      }
    }

    createGuest = () => {
        //the function open the modal of guest-details
    }

    saveGuest = () => {
        //the function create new guest and save it to guests[]
        //call the displayGuest func
    }

    displayGuest = () => {
        //display the added guest in new div
    }

    handleGuestStatus = (e) => {
        this.setState({status: e.target.value})
    }

    addCategory = () => {
        //the function save new category in categories[]
    }

    editGuest = () => {
        //the function open guest-details div
    }

    deleteGuest = () => {
        //the function delete guest from guests[]
    }

    render() {
        return (
            <div className="container">
                <button onClick={this.createGuest}>Create guest</button>
                {/* pressing Create guest button cause the guest-details to pop up */}
                <div className="guest-details">
                <h3>Guest Card</h3>
                    <p>Name:</p>
                    <input />
                    <p>Email:</p>
                    <input />
                    <p>Phone:</p>
                    <input />
                    <p>Number of invites:</p>
                    <input />
                    <p>Categories:</p>
                    <input />
                    <p>Invites Status:</p>
                    <input type="text" onChange={this.handleGuestStatus} value={this.state.status}/>
                    <button onClick={this.saveGuest}>Save Guest</button>
                </div>
                
                <div className="guest-buttons">
                    <button onClick={this.addCategory}>Add Category</button>
                    <button onClick={this.editGuest}>Edit Guest</button>
                    <button onClick={this.deleteGuest}>Delete Guest</button>
                </div>
            </div>
        );
    }
}

export default Guest;