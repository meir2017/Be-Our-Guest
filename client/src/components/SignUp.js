import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ModalBody } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            emailText: "",
            passText: "",
            passConfirm: "",
            load: false,
            listing: false,
            userSituation: "",
            sigin: false

        }
    }
    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onClickBtn = (e) => {
        e.preventDefault();
        if (this.state.passText === this.state.passConfirm) {
            this.setState({ load: true, listing: true })

            axios.post('/beOurGuest/newUser', this.state)
                .then(response => {
                    this.setState({ load: false });
                    console.log(response.data)
                    if (response.data === "user") {
                        this.setState({ userSituation: "Username already registered" })
                        console.log("Username already registered")
                    }
                    else if (response.data === "email") {
                        this.setState({ userSituation: "The email address is already registered" })
                        console.log("The email address is already registered")
                    }
                    else {
                        this.setState({
                            sigin: true,
                            userSituation: "Registration successful"
                        })
                        this.props.store.updateUser(response.data)
                    }

                })
            this.setState({
                inputText: "",
                emailText: "",
                passText: "",
                passConfirm: "",
            })
        }
        else
            alert("Your passwords do not match")
    }
    successSignUp = () => {
        return <Button onClick={() => { this.props.store.openModalLogin() }} color="primary" >Enter  </Button>
    }
    failedSignUp = () => {
        return <Button onClick={() => { this.setState({ listing: false, userSituation: "" }) }} color="primary" >Back</Button>
    }
    listing = () => {

    }
    BtnChange = (e) => {
        this.props.ChangeOptions();
    }
    render() {
        // const { classes } = this.props;

        return (
            <div>

                {!this.state.listing && <form action="" onSubmit={this.onClickBtn}>
                    <ModalBody state={{ textAlign: "center" }}>

                        <TextField
                            minLength={6}
                            id="User" label="User name" type="text"
                            className="textField" margin="normal"
                            name="inputText"
                            required

                            onChange={this.onChangeText} value={this.state.inputText}
                        />
                        <br />
                        <TextField
                            required
                            id="emil" label="Email" type="email"
                            className="textField" margin="normal"
                            name="emailText"
                            onChange={this.onChangeText} value={this.state.emailText}
                        />
                        <br />
                        <TextField
                            id="password-input" label="Password"
                            required
                            type="password" className="textField" margin="normal"
                            name="passText"
                            onChange={this.onChangeText} value={this.state.passText}
                        />
                        <br />
                        <TextField
                            id="passConfirm" label="Confirm" required
                            type="password" className="textField" margin="normal"
                            name="passConfirm"
                            onChange={this.onChangeText} value={this.state.passConfirm}
                        />
                        <br /><br />
                        <Button variant="contained" type="Submit" style={{ backgroundColor: '#560027' }}>Register  </Button>
                        <br /><br />
                    </ModalBody>
                </form>}

                {this.state.listing && <div className="lode">
                    {this.state.load && <CircularProgress size={80} />}
                    {!this.state.lode && <div>
                        {this.state.userSituation}
                        <br />
                        <br />
                        {this.state.sigin ? this.successSignUp() : this.failedSignUp()}
                    </div>}


                </div>}


            </div>
        );
    }
}

export default SignUp;
