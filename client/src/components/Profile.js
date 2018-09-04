import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject("store")
@observer
class Profile extends Component {
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
    }
    render(){

        // const item = this.props.store;
        return(
            <div className="profile-container">
                <h3>{this.props.store.user.username} Profile</h3>
                <h5 className="far fa-user">Username: {this.props.store.user.username}</h5>
                <br /><br />
                <h5 className="far fa-envelope">Email: {this.props.store.user.email}</h5>
                <br /><br />
                <h5 className="fas fa-key">Password: {this.props.store.user.password}</h5>
                <br /><br />
            </div>
        );
    }
}

export default Profile;
