import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class Invitation extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
        return (
            <div className="container">
                <h4>Invitation</h4>
                <div className="invitation-body">
                    <input className="title" placeholder="Email subject"/>
                    <input className="text" placeholder="Invitation text" />
                </div>
                <div className="buttons">
                    <Button color="primary">Attach file</Button>
                    <Button color="danger">Delete file</Button>
                    <Button color="primary">Select Guests</Button>
                    <Button color="primary">Save</Button>
                    <Button color="success">Send</Button>
                </div>
                
            </div>
        );
    }
}

export default Invitation;