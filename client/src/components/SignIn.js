import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
        }
    }
    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onClickBtn = (e) => {
        e.preventDefault();

        axios.post('/beOurGuest/login', { name: this.state.inputText, pass: this.state.passText })
            .then(response => {
                if (response.data != "") {
                    console.log("user login  " + JSON.stringify(response.data))
                    this.props.store.updateUser(response.data)
                    // this.props.userLogin();
                } else {
                    console.log("no user Account ")
                }

            }).catch(function (error) {
                console.log(error);
            });



        this.setState({ inputText: "", passText: "" });



    }
    BtnChange = (e) => {
        this.props.ChangeOptions();
    }
    render() {
        const { classes } = this.props;

        return (
            <div className="singInForm">
                <br /><br /> <br /> <br /><br />

                <Grid container spacing={24}>
                    <Grid item item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className="paperSingIn">
                            <Button variant="contained" variant="fab" style={{ width: "100px", height: "100px", top: "-50px" }} aria-label="Add" onClick={this.BtnChange} color="secondary" ><h2> go to Register</h2>  </Button>
                            <br /> <br /> <br />
                            <TextField
                                id="uncontrolled" label="User name" type="text"
                                className="textField" margin="normal"
                                name="inputText"
                                onChange={this.onChangeText} value={this.state.inputText}
                            />
                            <br /> <br /> <br />
                            <TextField
                                id="password-input" label="Password"
                                type="password" className="textField" margin="normal"
                                name="passText"
                                onChange={this.onChangeText} value={this.state.passText}
                            />
                            <br />
                            <br /><br /> <br /> <br />
                            <Button variant="contained" onClick={this.onClickBtn} color="primary" >Login  </Button>
                            <br /><br />
                        </Paper>
                    </Grid>
                    <Grid item item xs={3}>
                        {/* <Paper >xs</Paper> */}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SignIn;