import React, { Component } from 'react';
// import { FormErrors } from './FormErrors';
// import './Form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? 'good' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? 'good' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error, item) {
        if (item.length !== 0)
            return (error === "good" ? 'noError' : 'has-error');
        else return "emty"
    }


    render() {
        const item = this.state
        return (
            <form className="demoForm">
                <h2>Sign up</h2>
                <div className="panel panel-default">
                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                </div>
                <div className={`form-group ${this.errorClass(item.formErrors.email, item.email)}`}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" required className="form-control" name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleUserInput} />
                </div>
                {/* {this.state.formErrors.email === ' is invalid' ? ' is invalid' : ''} */}
                <div className={`form-group ${this.errorClass(item.formErrors.password, item.password)}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleUserInput} />
                </div>
                {/* {this.state.formErrors.password === ' is too short' ? ' is too short' : ''} */}
                <br />

                <button type="submit" className="btn btn-primary" disabled={!item.formValid}>Sign up</button>
            </form>
        )
    }
}

export default Form