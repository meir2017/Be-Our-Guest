import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject("store")
@observer
class AppDescription extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // let Background = "./../pic3.jpg"
        return (
            <div style={{ backgroundImage: "url(./../pic3.jpg)" }}>
                {/* <img src="./../pic3.jpg" alt=""/> */}
                <br />
                <br />
                <br />
                <div className="description">
                    <Jumbotron style={{backgroundColor:""}}>
                        <h1>Be Our Guest!</h1>
                        <h5>
                            Helps you to easily create and manage your event:</h5> <br />
                        <h5>invite guests, create and send invitations, track RSVPs, arrange guest seating, and much more!</h5> <br />
                        <h5>Sign in to create new event!</h5>
                    </Jumbotron>;
                </div>
                <br />
                <br />
                <br /><br />

            </div>
        );
    }
}

export default AppDescription;