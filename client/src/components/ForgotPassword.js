


import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ModalBody } from 'reactstrap';

import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject("store")
@observer
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            send: false,
            masg: ""
        }
    }
    onChangeText = (e) => {
        this.setState({ inputText: e.target.value });
    }
    onClickBtn = (e) => {
        e.preventDefault();
        this.setState({ send: !this.state.send });
        axios.get('/beOurGuest/ForgotPassword/' + this.state.inputText)
            .then(response => {
                console.log(response.data)
                this.setState({ masg: response.data });
            }).catch(function (error) { console.log(error); });
        this.setState({ inputText: "" });
    }
    render() {
        return (
            <div>
                {!this.state.send &&
                    <form action="" onSubmit={this.onClickBtn}>
                        <ModalBody state={{ textAlign: "center" }}>
                            <TextField
                                required
                                id="uncontrolled" label="Enter your e-mail" type="email"
                                className="textField" margin="normal"
                                name="inputText"
                                onChange={this.onChangeText} value={this.state.inputText}
                            />
                            <br /> <br /><br />
                            <Button variant="contained" type="Submit" color="primary" >Send  </Button>
                            <br /><br />
                        </ModalBody>
                    </form>
                }
                {this.state.send && <div style={{ textAlign: "center" }}>
                    <br /> <br /> <br /><br />
                    {this.state.masg}
                    <br /><br /> <br /><br />
                </div>}
            </div>

        )
    }
}

export default ForgotPassword;