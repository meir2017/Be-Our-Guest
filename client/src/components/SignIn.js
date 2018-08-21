import React, { Component } from 'react';
import Popup from 'react-popup';
import { Button } from 'reactstrap';

import SignUp from './components/SignUp';

export class SignIn extends Component {
    constructor(props) {
      super(props);

      let defaultValue = null;

      this.state = {
        userName: defaultValue,
        email: null
        };

    this._onChange = (e) => this.onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onChange(this.state.userName, this.state.email);
        }
    }

    _onChange(e) {
        let userNameValue = e.target.value;
        let userEmail = e.target.value;
        this.setState({userName: userNameValue, email: userEmail});
    }

    render() {
        return (
            <Popup>
                <div className="container">
                    <p>User Name:</p>
                    <input type="text" placeholder="username" value={this.state.value} onChange={this.onChange} />
                    <p>Email:</p>
                    <input type="text" placeholder="example@gmail.com" value={this.state.input} onChange={this.onChange} />
                    <Button color="primary">Sign in</Button>
                    <p>don't have an account?</p>
                    <SignUp />
                </div>
            </Popup>
        );
    }
}

export default SignIn;