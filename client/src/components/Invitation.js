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
            titleInput: this.state.titleInput,
            textInput: this.state.textInput,
            background: this.state.background,
            titleColor: this.state.titleColor,
            bodyText: this.state.bodyText,

        }//_id

        let indexEvent = this.props.store.user.eventindex;
        let eventId = this.props.store.user.events[indexEvent]._id

        console.log("eventId  " + eventId)
        console.log("indexEvent  " + indexEvent)
        axios.post(`/beOurGuest/saveInvitation/${eventId}/${indexEvent}/`, InvitationObj)
            .then(response => {
                console.log("save InvitationObj")
                console.log((response.data))
                // this.props.store.removEvent(index)
                // this.handleClose(e)
            })
    }

    sendInvitation = () => {
        //the function send invitation to selected guests emails
    }

    render() {
        return (
            <div className="container">
                <h4>Write your invitation</h4>
                <div className="row">
                    <div className="col-sm-6">
                        <input type="text" name="titleInput" className="title" placeholder="Title" onChange={this.onChangeText} value={this.state.titleInput} />
                        <br /><br />
                        <textarea name="textInput" onChange={this.onChangeText} value={this.state.textInput} />


                    </div>
                    <div className="col-sm-6">
                        <div className="myColor">
                            <div >
                                <input type="color" onChange={this.onChangeText} id="background" name="background" />
                                <label htmlFor="background">background</label>
                            </div>

                            <div>
                                <input type="color" onChange={this.onChangeText} id="titleColor" name="titleColor" />
                                <label htmlFor="titleColor">title Color</label>
                            </div>

                            <div>
                                <input type="color" onChange={this.onChangeText} id="bodyText" name="bodyText" />
                                <label htmlFor="bodyText">body Text</label>
                            </div>
                        </div>



                    </div>
                </div>


                <div className="display-invitation-input" style={{ width: "600px", height: "300px", border: "solid red 2px", backgroundColor: `${this.state.background}` }}>

                    <h2 style={{ color: `${this.state.titleColor}` }}>{this.state.titleInput}</h2>
                    <h4 style={{ textAlign: "left", whiteSpace: "pre-wrap", color: `${this.state.bodyText}` }}>{this.state.textInput}</h4>


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