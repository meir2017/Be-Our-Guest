
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { withStyles, MenuItem, Menu, IconButton } from "@material-ui/core"

import AccountCircle from '@material-ui/icons/AccountCircle';
import LogIn from './LogIn';
import YouLoginAs from './YouLoginAs';

import { observer, inject } from 'mobx-react';
import axios from 'axios';


const styles = theme => ({
    root: {        
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },    
    
    menuAccountButton: {
      //  float: 'right',
        //marginRight: 1520,
        //marginLeft: 1150,
    },

});
@inject("store")
@observer
class AccountManager extends Component {
    state = {
        anchorMenu: null,
        open: false,
        anchorMenuAccount: null,
        expanded: null,
        profileModal: false,
    };

    handleMenuAccount = event => {
        if (this.props.store.user.userLog)
            this.setState({ anchorMenuAccount: event.currentTarget });
        else
            this.props.store.openModalLogin();

    };

    handleCloseMenuAccount = () => {
        this.setState({ anchorMenuAccount: null, expanded: false });
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    handleLogout = (e) => {
        this.props.store.LogoutUser();
        this.handleCloseMenuAccount();
    }
    openProfile = (e) => {
        this.setState ({
            profileModal: ! this.state.profileModal,
        })
    }

    render() {
        const { classes } = this.props;
        const { anchorMenu, open, anchorMenuAccount, expanded } = this.state;
        const openMenu = Boolean(anchorMenu);
        const openMenuAccount = Boolean(anchorMenuAccount);
        const openEvent = Boolean(expanded);
        return (

            <div className={classes.root} >
                <IconButton
                    aria-owns={openMenuAccount ? "menuAccount-appbar" : null}
                    aria-haspopup="true"
                    onClick={this.handleMenuAccount}
                    className={classes.menuAccountButton}
                    aria-label="Menu"
                    color="inherit">
                    <AccountCircle />
                </IconButton>
                <LogIn />
                {(this.props.store.user.userLog) ? <YouLoginAs /> : false}
                <Menu
                    id="menuAccount-appbar"
                    anchorEl={anchorMenuAccount}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={openMenuAccount}
                    onClose={this.handleCloseMenuAccount}
                >
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    <MenuItem onClick={this.openProfile}>Profile</MenuItem>
                    <MenuItem onClick={this.handleCloseMenuAccount} onClick={this.handleLogout} >My account</MenuItem>
                </Menu>
                <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.profileModal} toggle={this.openProfile} >
                    <ModalHeader toggle={this.toggleSend}><h3>{this.props.store.user.username} Profile</h3>
                        <h5 className="far fa-user">Username: {this.props.store.user.username}</h5>
                        <br /><br />
                        <h5 className="far fa-envelope">Email: {this.props.store.user.email}</h5>
                        <br /><br />
                </ModalHeader>
                </Modal>
            </div>
        );
    }
}

//export default Navbar;

export default withStyles(styles)(AccountManager);

