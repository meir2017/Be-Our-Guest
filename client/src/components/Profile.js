import React, { Component } from 'react';

// import axios from 'axios';

// import { observer, inject } from 'mobx-react';

// @inject("store")
// @observer

class Profile extends Component {
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
    }
    render(){

        const item = this.props.store;
        return(
            <div className="profile-container">
                <h3>{item.user}</h3>
                <h5 className="far fa-user" name={this.props.state.inputText}>Username: {this.state.inputText}</h5>
                <h5 className="far fa-envelope" name={this.props.state.emailText}>Email: {this.state.emailText}</h5>
                <h5 className="fas fa-key" name={this.props.state.passText}>Password: {this.state.passText}</h5>
            </div>
        );
    }
}

export default Profile;
