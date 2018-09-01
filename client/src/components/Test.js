
import React from 'react';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSend = this.toggleSend.bind(this);
        this.state = {
            popoverSend: false,
            popoverRemove: false

        };
    }

    toggleSend = () => {
        this.setState({
            popoverSend: !this.state.popoverSend
        });
    }
    toggleRemove = () => {
        this.setState({
            popoverRemove: !this.state.popoverRemove
        });
    }

    render() {
        return (
            <div>
                <Button id="Popover1" onClick={this.toggleSend}>
                    Launch Popover
         </Button>


                <Button id="Popover2" onClick={this.toggleRemove}>
                    toggleRemove
         </Button>

                <Popover placement="bottom" isOpen={this.state.popoverSend} target="Popover1" toggle={this.toggleSend}>
                    <PopoverHeader >Do you want to send an invitation to all your guests</PopoverHeader>
                    <PopoverBody className="btnSend" >
                        <Button onClick={this.toggleSend} color="primary">Send</Button>
                        <Button onClick={this.toggleSend} color="secondary" style={{ marginLeft: "40px" }}>Cancel</Button>
                    </PopoverBody>
                </Popover>

                <Popover placement="bottom" isOpen={this.state.popoverRemove} target="Popover2" toggle={this.toggleRemove}>
                    <PopoverHeader >Do you want to delete this invitation?</PopoverHeader>
                    <PopoverBody className="btnSend" >
                        <Button onClick={this.toggleRemove} color="primary">Yes</Button>
                        <Button onClick={this.toggleRemove} color="secondary" style={{ marginLeft: "40px" }}>No</Button>
                    </PopoverBody>
                </Popover>




            </div>
        );
    }
}