import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject("store")
@observer
class YouLoginAs extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="youLoggedAs" style={{ padding: "10px" }}>
                <h6> {this.props.store.user.username} </h6>
            </div>
        );
    }
}

export default YouLoginAs;


