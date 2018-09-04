
import React, { Component } from 'react';
import { withStyles, MenuItem, Menu, IconButton } from "@material-ui/core"

import AccountCircle from '@material-ui/icons/AccountCircle';
import LogIn from './LogIn';
import Profile from './Profile';

import { observer, inject } from 'mobx-react';
import axios from 'axios';


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    menuAccountButton: {
        float: 'right',
        //marginRight: 1520,
        marginLeft: 1150,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        width: 300,
        zIndex: 200,
    },
    rootList: {
        width: '100%',
        maxWidth: 260,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
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
                    <MenuItem onClick={this.handleCloseMenuAccount}>Profile</MenuItem>
                    <MenuItem onClick={this.handleCloseMenuAccount} onClick={this.handleLogout} >My account</MenuItem>
                </Menu>
                {/* {(this.props.store.user.userLog) ? <Profile /> : false} */}
            </div>
        );
    }
}

//export default Navbar;

export default withStyles(styles)(AccountManager);

