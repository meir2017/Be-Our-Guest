import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Popup from 'react-popup';


export class CreateEvent extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <div className="button-container">
                <Button color="primary" onClick={this.props}>Create Event</Button>
            </div>
        );
    }
}

export default CreateEvent;