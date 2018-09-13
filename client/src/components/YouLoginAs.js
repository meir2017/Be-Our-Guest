import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject("store")
@observer
class YouLoginAs extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="youLoggedAs">
                <h3> {this.props.store.user.username} </h3>
            </div>
        );
    }
}

export default YouLoginAs;
