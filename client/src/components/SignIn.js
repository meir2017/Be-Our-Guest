import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ModalBody, CardBody } from 'reactstrap';
// import ForgotPassword from './components/ForgotPassword';

import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject("store")
@observer
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            passText: "",
            ForgotPassword: false
        }
    }
    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onClickBtn = (e) => {
        e.preventDefault();
        axios.post('/beOurGuest/login', { name: this.state.inputText, pass: this.state.passText })
            .then(response => {
                console.log(response.data)
                if (response.data !== "") {
                    // console.log("user login  " + JSON.stringify(response.data))
                    this.props.store.updateUser(response.data)
                } else {
                    console.log("no user Account ")
                }
                this.props.store.openModalLogin();
            }).catch(function (error) { console.log(error); });
        this.setState({ inputText: "", passText: "" });
    }
    forgot_password = () => {
        this.setState({ ForgotPassword: true })
    }
    render() {
        return (
            <div>
                <ModalBody state={{ textAlign: "center" }}>
                    <TextField
                        id="uncontrolled" label="User name" type="text"
                        className="textField" margin="normal"
                        name="inputText"
                        onChange={this.onChangeText} value={this.state.inputText}
                    />
                    <br /> <br />
                    <TextField
                        id="password-input" label="Password"
                        type="password" className="textField" margin="normal"
                        name="passText"
                        onChange={this.onChangeText} value={this.state.passText}
                    />
                    <br /> <br /><br />
                    <Button variant="contained" onClick={this.onClickBtn} style={{backgroundColor:'#560027'}}>Login  </Button>
                    <br /><br />
                </ModalBody>
                <CardBody>
                    <div className="pas">
                        <p>Forgot <a onClick={() => { this.props.BtnPassword() }} className="blue-text">Password?</a></p>
                    </div>

                </CardBody>
            </div>

        )
    }
}

export default SignIn;