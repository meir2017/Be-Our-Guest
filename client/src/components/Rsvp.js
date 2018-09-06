

import React, { Component } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import { Button, Form } from 'reactstrap';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
// import logo from '../../.public/loading.jpg';
// import logo from '../../public/loading.jpg';



// comment: String,
// numInvited: Number,
// numComing: Number,
// numNotComing: Number,
// seated: Boolean
import axios from 'axios';
import { observer, inject } from 'mobx-react';
@inject("store")
@observer
class Rsvp extends Component {
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


            arryComing: [],
            arryNotComing: [],
            coming: 0,
            notComing: 0,
            numInvited: "",
            vient: ""


        }
    }


    onSelectConfirmed = (e) => {
        debugger
        let coming = this.state.coming
        let notComing = this.state.notComing
        let numInvited = this.state.numInvited
        let vient = this.state.vient;
        if (e.target.name === "coming") {
            console.log("coming")
            coming = e.target.value;
            numInvited = vient - coming - notComing;
            notComing = vient - coming;
        }

        if (e.target.name === "notComing") {
            console.log("notComing")
            notComing = e.target.value;
            numInvited = vient - coming - notComing;
            coming = vient - notComing;
        }

        console.log(this.state.coming)
        let setArryComing = [];
        let setArryNotComing = [];

        for (let index = 0; index <= coming; index++) {
            setArryComing.push(index)
        }
        for (let index = 0; index <= notComing; index++) {
            setArryNotComing.push(index)
        }

        this.setState({ [e.target.name]: e.target.value, arryComing: setArryComing, arryNotComing: setArryNotComing, numInvited: numInvited });
    };
    Submitfunc = (e) => {
        e.preventDefault();
        console.log(this.state.numGuest);
        console.log(this.state.checkedB);
        //send the info to evntid,gustid
        let objRsvp = {
            coming: this.state.coming,
            notComing: this.state.notComing,
            numInvited: this.state.numInvited,
            guestId: this.props.match.params.guestId
        }
        console.log(this.props.match.params.guestId)
        axios.post('/beOurGuest/rsvp/guestAnswer/', objRsvp)
            .then(response => {
                console.log((response.data))
                // this.props.store.addInvitation(response.data)
            })
    }

    componentWillMount = () => {
        let guestId = this.props.match.params.guestId;

        axios.get(`/beOurGuest/rsvpGuest/guestId/${guestId}`)
            .then(response => {
                debugger
                console.log("rsvpGuest")
                let item = response.data;
                this.setState({
                    numInvited: item.numInvited,
                    vient: item.numInvited
                })

                let newArry = [];
                for (let index = 0; index <= item.numInvited; index++) {
                    newArry.push(index)
                }
                this.setState({ arryComing: newArry, arryNotComing: newArry })
                this.props.ChangeToRsvpPage();
                this.getUserInfo();

            })



    }
    getUserInfo = () => {

        // let infoEvent = {
        //     vetId: this.props.match.params.vetId,
        //     eventId: this.props.match.params.eventId,
        //     guestId: this.props.match.params.guestId
        // }
        let vetId = this.props.match.params.vetId;
        axios.get(`/beOurGuest/rsvpGuest/${vetId}`)
            .then(response => {
                console.log("rsvpGuest")
                let item = response.data;
                this.setState({
                    invitationName: item.invitationName,
                    titleInput: item.titleInput,
                    textInput: item.textInput,
                    whenEvent: item.whenEvent,
                    whereEvent: item.whereEvent,
                    background: item.background,
                    titleColor: item.titleColor,
                    bodyColor: item.bodyColor,
                    fontTitle: item.fontTitle,
                    fontBody: item.fontBody,
                    display_rsvp: true
                })
            });

    }

    render() {
        // let newArry = [];
        // for (let index = 0; index < this.state.coming; index++) {
        //     newArry.push(index)
        // }
        // this.setState({ arryComing: this.newArry })
        // this.props.ChangeToRsvpPage();
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6" >
                        <br /><br />  <br />
                        <Form className="display_rsvp" onSubmit={this.Submitfunc} style={{ backgroundColor: `${this.state.background}` }} >
                            <div  >
                                <h2 style={{ color: `${this.state.titleColor}`, fontFamily: `${this.state.fontTitle}` }}>{this.state.titleInput}</h2>
                                <div style={{ whiteSpace: "pre-wrap", padding: "10px", color: `${this.state.bodyColor}`, fontFamily: `${this.state.fontBody}` }}>
                                    <h4 >{this.state.textInput}</h4>
                                </div>
                                <p>{this.state.whenEvent}  <br />  {this.state.whereEvent}</p>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Coming</label>
                                    <div className="rsvpInput">
                                        {/* {this.SetComing(this.state.coming)} */}
                                        <select className="form-control" id="coming" value={this.state.coming} onChange={this.onSelectConfirmed} name="coming">
                                            {this.state.arryComing.map((item, index) => {
                                                return <option key={index + item}>{item} </option>

                                            })}

                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-4 rsvpForm m2">
                                    <label htmlFor="">Not Coming</label>
                                    <div className="rsvpInput">
                                        <select className="form-control" id="notComing" value={this.state.notComing} onChange={this.onSelectConfirmed} name="notComing">
                                            {this.state.arryNotComing.map((item, index) => {
                                                return <option key={index + item}>{item} </option>

                                            })}
                                        </select>
                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <label htmlFor="">Undecided</label>

                                    <div className="Undecided" id="Undecided">
                                        <div className="Undecided1">
                                            {this.state.numInvited}
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <br />
                            <Button>Submit</Button>

                            <br />  <br />
                        </Form>
                    </div>
                    <div className="col-sm-3"></div>
                </div>


            </div>
        );
    }
}

export default Rsvp;



