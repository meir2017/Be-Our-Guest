

import React, { Component } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import { Button, Form } from 'reactstrap';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
// import logo from '../../.public/loading.jpg';
// import logo from '../../public/loading.jpg';

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


            checkedB: false,
            numGuest: 0,
            myText: "",
            display_rsvp: false
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        // alert(this.state[name])
    };
    handleChangeGuest = name => event => {
        this.setState({ [name]: event.target.value });
        // alert(this.state[name])
    };
    Submitfunc = (e) => {
        e.preventDefault();
        console.log(this.state.numGuest);
        console.log(this.state.checkedB);
        //send the info to evntid,gustid
        // let objInfo={

        // }
        // app.post('/beOurGuest/rsvp/Answer/', objInfo)
        // .then()
    }

    componentWillMount = () => {
        this.props.ChangeToRsvpPage();
        this.getUserInfo();
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
            })

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6" >
                        <br /><br />
                        <Form className="display_rsvp" onSubmit={this.Submitfunc} style={{ backgroundColor: `${this.state.background}` }} >
                            <div  >
                                <h2 style={{ color: `${this.state.titleColor}`, fontFamily: `${this.state.fontTitle}` }}>{this.state.titleInput}</h2>
                                <div style={{ whiteSpace: "pre-wrap", padding: "10px", color: `${this.state.bodyColor}`, fontFamily: `${this.state.fontBody}` }}>
                                    <h4 >{this.state.textInput}</h4>
                                </div>
                                <p>{this.state.whenEvent}  <br />  {this.state.whereEvent}</p>
                            </div>
                            are you caming:   <Checkbox
                                checked={this.state.checkedB}
                                onChange={this.handleChange("checkedB")}
                                value="checkedB"
                                color="primary"
                            />
                            <br /><br />

                            <FormControl>
                                How many will you come?  <InputLabel htmlFor="age-native-simple"></InputLabel>
                                <Select
                                    native
                                    value={this.state.age}
                                    onChange={this.handleChangeGuest('numGuest')}  >
                                    <option value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </Select>
                            </FormControl>
                            <br />
                            <br />
                            <br />
                            <Button>Submit</Button>
                            <br />
                            <br />
                        </Form>
                    </div>
                    <div className="col-sm-3"></div>
                </div>


            </div>
        );
    }
}

export default Rsvp;



