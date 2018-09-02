import React, { Component } from 'react';

// import axios from 'axios';

// import { observer, inject } from 'mobx-react';

// @inject("store")
// @observer

class YouLoginAs extends Component {
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
    }
    render(){
        return(
            <div className="youLoggedAs">
                <h3>Hello {(this.props.store.user.userLog)} !</h3>
            </div>
        );
    }
}

export default YouLoginAs;
