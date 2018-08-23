
import React from 'react';
import TextField from '@material-ui/core/TextField';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardBody } from 'reactstrap';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            openLogin: true,
            password: false
        };
        this.toggle = this.toggle.bind(this);
    }

    handlerRegister = () => {
        this.setState({ openLogin: false });
    }
    handlerLogin = () => {
        this.setState({ openLogin: true, password: false });
    }

    forgot_password = () => {
        this.setState({ password: true });
    }
    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal style={{ top: "120px" }} toggle={this.toggle} isOpen={this.state.modal} className={this.props.className}>
                    <div className="maintop">
                        <Button className="btnl " color="primary" onClick={this.handlerLogin}><i className="fas fa-user"> </i>  Login</Button>
                        <Button className="btnr " color="primary" onClick={this.handlerRegister}><i className="fas fa-user-plus"></i>  Register</Button>
                    </div>
                    {(this.state.openLogin && !this.state.password) && <SignIn BtnPassword={this.forgot_password} />}
                    {(this.state.openLogin && this.state.password) && <ForgotPassword BtnPassword={this.forgot_password} />}
                    {!this.state.openLogin && <SignUp />}
                    {/* {!this.state.openLogin && <SignUp />} */}
                </Modal>

            </div>
        );
    }
}

export default LogIn;