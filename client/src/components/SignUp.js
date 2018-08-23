import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ModalBody, CardBody } from 'reactstrap';

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
                    console.log((" new user " + response.data._id))
                    this.props.store.updateUser(response.data)
                })
        }
        else
            alert("Your passwords do not match")
    }
    BtnChange = (e) => {
        this.props.ChangeOptions();
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <ModalBody state={{ textAlign: "center" }}>
                        <TextField
                            id="User" label="User name" type="text"
                            className="textField" margin="normal"
                            name="inputText"
                            onChange={this.onChangeText} value={this.state.inputText}
                        />
                        <br />
                        <TextField
                            id="emil" label="Email" type="text"
                            className="textField" margin="normal"
                            name="emailText"
                            onChange={this.onChangeText} value={this.state.emailText}
                        />
                        <br />
                        <TextField
                            id="password-input" label="Password"
                            type="password" className="textField" margin="normal"
                            name="passText"
                            onChange={this.onChangeText} value={this.state.passText}
                        />
                        <br />
                        <TextField
                            id="passConfirm" label="Confirm"
                            type="password" className="textField" margin="normal"
                            name="passConfirm"
                            onChange={this.onChangeText} value={this.state.passConfirm}
                        />
                        <br /><br />
                        <Button variant="contained" onClick={this.onClickBtn} color="primary" >register  </Button>
                        <br /><br />
                    </ModalBody>
                    {/* <CardBody>
                    <div className="pas">
                        <p>Forgot <a href="#" className="blue-text">Password?</a></p>
                    </div>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </CardBody> */}
                </div>
            </div>
        );
    }
}

export default SignUp;