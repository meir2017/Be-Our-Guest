import React, { Component } from 'react';
import Popup from 'react-popup';
import { Button } from 'reactstrap';


export class SignUp extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userName: defaultValue,
        email: null,
        password: null
        };

    this._onChange = (e) => this.onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onChange(this.state.userName, this.state.email, this.state.password);
        }
    }

    _onChange(e) {
        let userNameValue = e.target.value;
        let userEmail = e.target.value;
        let passwordValue = e.target.value;
        this.setState({userName: userNameValue, email: userEmail, password: passwordValue});
    }

    render() {
        return (
            <Popup>
                <div className="container">
                    <p>User Name:</p>
                    <input type="text" placeholder="username" value={this.state.value} onChange={this.onChange} />
                    <p>Email:</p>
                    <input type="text" placeholder="example@gmail.com" value={this.state.input} onChange={this.onChange} />
                    <p>Password:</p>
                    <input type="text" placeholder="******" value={this.state.value} onChange={this.onChange} />
                    <p>Confirm password</p>
                    <input type="text" placeholder="******" />
                    <Button color="primary">Sign Up</Button>
                </div>
            </Popup>
        );
    }
}

export default SignUp;