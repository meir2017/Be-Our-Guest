import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
            <div className="singUpForm">
                <br /><br />
                <br /><br /> <br />
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className="paperSingUp" >
                            <Button variant="contained" variant="fab" style={{ width: "100px", height: "100px", top: "-50px" }} aria-label="Add" onClick={this.BtnChange} color="secondary" ><h5> go to Login</h5>  </Button>
                            <br />
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
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SignUp;