import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import TextField from '@material-ui/core/TextField';

import axios from 'axios';

// import MyModal from './Modal';

import { observer, inject } from 'mobx-react';

@inject("store")
@observer

class Profile extends Component {
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
    }
    render(){
        return(
            <div className="profile-container">
                <h5 name={this.props.state.inputText}>Username: {this.state.inputText}</h5>
                <h5 name={this.props.state.emailText}>Email: {this.state.emailText}</h5>
                <h5 name={this.props.state.passText}>Password: {this.state.passText}</h5>
            </div>
        );
    }
}

export default Profile;
