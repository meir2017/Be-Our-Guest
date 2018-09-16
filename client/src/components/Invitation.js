import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class Invitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitationName: "",
            titleInput: '',
            textInput: '',
            background: "",
            titleColor: "",
            bodyColor: "",
            fontTitle: "",
            fontBody: "",
            whenEvent: "",
            whereEvent: "",
            fontfamily: ["Forte", "David", "Edwardian Script ITC", "Bookman Old Style",
                "Matura MT Script Capitals", "Algerian", "Broadway", "Goudy Stout", "Agency FB",
                "Bodoni MT Poster Compressed", "Bodoni MT", "Segoe Script", "Jokerman"]
        }
        this.toggle = this.toggle.bind(this);

    }
    componentWillUpdate = () => {
        const ST = this.props.store;

        if (ST.invitationIndex != null) {
            let evt = ST.user.events[ST.eventIndex].invitations[ST.invitationIndex]
            this.setState({
                invitationName: evt.invitationName,
                titleInput: evt.titleInput,
                textInput: evt.textInput,
                background: evt.background,
                titleColor: evt.titleColor,
                bodyColor: evt.bodyColor,
                fontTitle: evt.fontTitle,
                fontBody: evt.fontBody,
                whenEvent: evt.whenEvent,
                whereEvent: evt.whereEvent,
            })
        }
        this.props.store.theInvitationIndex(null)
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        // alert(e.target.value)
    };


    saveInvitation = (e) => {
        e.preventDefault();

        let InvitationObj = {
            invitationName: this.state.invitationName,
            titleInput: this.state.titleInput,
            textInput: this.state.textInput,
            whenEvent: this.state.whenEvent,
            whereEvent: this.state.whereEvent,
            background: this.state.background,
            titleColor: this.state.titleColor,
            bodyColor: this.state.bodyColor,
            fontTitle: this.state.fontTitle,
            fontBody: this.state.fontBody,
        }
        let indexEvent = this.props.store.eventIndex;
        let eventId = this.props.store.user.events[indexEvent]._id
        console.log("eventId  " + eventId)
        console.log("indexEvent  " + indexEvent)
        axios.post(`/beOurGuest/saveInvitation/${eventId}/`, InvitationObj)
            .then(response => {
                console.log("save InvitationObj")
                console.log((response.data))
                this.props.store.addInvitation(response.data)
                this.toggle();
            })
    }


    render() {
        // this.props.vet != null ? this.renderpage() : false
        return (
            <div className="containerInvitation" >

                <div className="inputinvitation" style={{ textAlign: "left" }} >
                    <input type="text" name="invitationName" className="form-control" placeholder="Invitation name" onChange={this.onChangeText} value={this.state.invitationName} />
                    <br /><br />

                    <input type="text" name="titleInput" className="form-control" placeholder="Title" onChange={this.onChangeText} value={this.state.titleInput} />
                    <br /><br />
                    <textarea rows="6" cols="40" name="textInput" className="form-control" onChange={this.onChangeText} value={this.state.textInput} />
                    <br />
                    <input type="text" name="whenEvent" className="form-control" placeholder="when" onChange={this.onChangeText} value={this.state.whenEvent} />
                    <br /><br />
                    <input type="text" name="whereEvent" className="form-control" placeholder="where" onChange={this.onChangeText} value={this.state.whereEvent} />
                    <br /><br />
                </div>


                <div >
                    <Button className="divBtn" style={{backgroundColor:'#560027'}} onClick={this.toggle}>Design</Button>

                    {/* <Button className="divBtn" color="primary" onClick={this.saveInvitation}>Save</Button>
                    <Button className="divBtn" color="success" onClick={this.sendInvitation}>Send</Button> */}
                </div>

                <div>
                    <Modal isOpen={this.state.modal} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Design your Invitation</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="myColor">
                                        <div >
                                            <input className="color" type="color" onChange={this.onChangeText} id="background" value={this.state.background} name="background" />
                                            <label htmlFor="background">background</label>
                                        </div>
                                        <div>
                                            <input className="color" type="color" onChange={this.onChangeText} id="titleColor" value={this.state.titleColor} name="titleColor" />
                                            <label htmlFor="titleColor">title Color</label>
                                        </div>
                                        <div >
                                            <input className="color" type="color" onChange={this.onChangeText} id="bodyColor" value={this.state.bodyColor} name="bodyColor" />
                                            <label htmlFor="bodyColor">body Text</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    font title: <select className="form-control" id="fontTitle" value={this.state.fontTitle} onChange={this.onChangeText} name="fontTitle">
                                        {this.state.fontfamily.map((item, index) => {
                                            return <option key={index + item}>{item} </option>
                                        })}
                                    </select>
                                    font body:
                                        <select className="form-control" id="fontBody" value={this.state.fontBody} onChange={this.onChangeText} name="fontBody">
                                        {this.state.fontfamily.map((item, index) => {
                                            return <option key={index + item}>{item} </option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="display_result" style={{ backgroundColor: `${this.state.background}` }}>

                                <h2 style={{ color: `${this.state.titleColor}`, fontFamily: `${this.state.fontTitle}` }}>{this.state.titleInput}</h2>
                                <div style={{ whiteSpace: "pre-wrap", padding: "10px", color: `${this.state.bodyColor}`, fontFamily: `${this.state.fontBody}` }}>
                                    <h4 >{this.state.textInput}</h4>
                                </div>
                                <p>{this.state.whenEvent} <br />
                                    {this.state.whereEvent}</p>
                            </div>


                        </ModalBody>
                        <ModalFooter>
                            <Button style={{backgroundColor:'#560027'}} onClick={this.saveInvitation}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>




            </div>
        );
    }
}

export default Invitation;