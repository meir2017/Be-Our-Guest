import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            dropdownOpen1: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    toggle1 = () => {
        this.setState(prevState => ({
            dropdownOpen1: !prevState.dropdownOpen1
        }));
    }

    render() {
        return (

            <div className="nva1">
                <div className="row ">
                    <div className="col-sm-4"> be our guest </div>
                    <div className="col-sm-4"> </div>
                    <div className="col-sm-2 nav3" >
                        <Dropdown className="nva2" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                categorises
                           </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem disabled>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown className="nva2" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                event
                           </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem disabled>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-sm-2">
                        <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                            <DropdownToggle >
                                <i className="fas fa-user-circle" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem disabled>Action</DropdownItem>
                                <DropdownItem>Login</DropdownItem>
                                <DropdownItem>Logout</DropdownItem>
                                <DropdownItem>my account</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>


            </div>


        );
    }
}