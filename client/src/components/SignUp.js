import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ModalBody } from 'reactstrap';

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
            passConfirm: ""
        }
    }
    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onClickBtn = (e) => {
        e.preventDefault();
        if (this.state.passText === this.state.passConfirm) {
            axios.post('/beOurGuest/newUser', this.state)
                .then(response => {
                    this.props.store.openModalLogin();
                    console.log(response.data)
                    if (response.data === "user")
                        console.log("Username already registered")
                    else if (response.data === "email")
                        console.log("The email address is already registered")
                    else { this.props.store.updateUser(response.data) }

                })
        }
        else
            alert("Your passwords do not match")
    }
    BtnChange = (e) => {
        this.props.ChangeOptions();
    }
    render() {
        // const { classes } = this.props;

        return (
            <div>

                <form action="" onSubmit={this.onClickBtn}>
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
                        <Button variant="contained" type="Submit" style={{backgroundColor:'#560027'}}>Register  </Button>
                        <br /><br />
                    </ModalBody>
                </form>
            </div>
        );
    }
}

export default SignUp;
