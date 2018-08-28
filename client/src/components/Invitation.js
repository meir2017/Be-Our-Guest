import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
export class Invitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitationName: "",
            titleInput: '',
            textInput: '',
            background: "",
            titleColor: "",
            bodyText: ""
        }


    }
    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };



    saveInvitation = (e) => {
        e.preventDefault();

        let InvitationObj = {
            invitationName: this.state.invitationName,
            titleInput: this.state.titleInput,
            textInput: this.state.textInput,
            background: this.state.background,
            titleColor: this.state.titleColor,
            bodyText: this.state.bodyText,

        }//_id

        let indexEvent = this.props.store.eventIndex;
        let eventId = this.props.store.user.events[indexEvent]._id

        console.log("eventId  " + eventId)
        console.log("indexEvent  " + indexEvent)
        axios.post(`/beOurGuest/saveInvitation/${eventId}/`, InvitationObj)
            .then(response => {
                console.log("save InvitationObj")
                console.log((response.data))
                this.props.store.addInvitation(response.data)
                // this.handleClose(e)
            })
    }

    sendInvitation = () => {
        //the function send invitation to selected guests emails
    }

    render() {
        return (
            <div className="container">
                <h3>Write your invitation</h3>
                <div className="row" style={{ textAlign: "left" }}>
                    <div className="col-sm-8">
                        <input type="text" name="invitationName" className="invitationName" placeholder="Invitation name" onChange={this.onChangeText} value={this.state.invitationName} />
                        <br /><br />

                        <input type="text" name="titleInput" className="title" placeholder="Title" onChange={this.onChangeText} value={this.state.titleInput} />
                        <br /><br />
                        <textarea rows="4" cols="30" name="textInput" onChange={this.onChangeText} value={this.state.textInput} />
                    </div>

                    <div className="col-sm-4">
                        <br />
                        <br />
                        <br />
                        <div className="myColor">
                            <div >
                                <input className="color" type="color" onChange={this.onChangeText} id="background" name="background" />
                                <label htmlFor="background">background</label>
                            </div>
                            <br />
                            <div>
                                <input className="color" type="color" onChange={this.onChangeText} id="titleColor" name="titleColor" />
                                <label htmlFor="titleColor">title Color</label>
                            </div>
                            <br />
                            <div >
                                <input className="color" type="color" onChange={this.onChangeText} id="bodyText" name="bodyText" />
                                <label htmlFor="bodyText">body Text</label>
                            </div>
                        </div>



                    </div>
                </div>


                <div className="display-invitation-input" style={{ width: "600px", height: "300px", border: "solid grey 1px", backgroundColor: `${this.state.background}` }}>

                    <h2 style={{ color: `${this.state.titleColor}` }}>{this.state.titleInput}</h2>
                    <h4 style={{ textAlign: "left", whiteSpace: "pre-wrap", padding: "10px", color: `${this.state.bodyText}` }}>{this.state.textInput}</h4>


                </div><br />

                <div >
                    <Button className="divBtn" color="primary" onClick={this.saveInvitation}>Save</Button>
                    <Button className="divBtn" color="success" onClick={this.sendInvitation}>Send</Button>
                </div>




            </div>
        );
    }
}

export default Invitation;