// import React from 'react';

import React, { Component } from 'react';
// import classNames from 'classnames';
import {
    AppBar,
    withStyles,
    Toolbar,
} from "@material-ui/core"   //AccountManager

import OurMenu from './OurMenu';
import AccountManager from './AccountManager';
const styles = theme => ({
    root: {        
        display: 'flex',       
    },
    menu: {
        flexGrow: 1,        
        // justifyContent: 'flex-start',
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'nowrap',
       // justifyContent: 'space-between',
    },
    menuButton: {
        // justifyContent: 'flex-start',
        flexGrow: 1,
        // position: 'absolute',
        // top: 10,
        // left:10,
        // marginLeft: -120,
        // marginRight: 20
    },
    space: {
        flexGrow: 6,
    },
    account:{
        // flexGrow: 1,        
        justifyContent: 'flex-end',
    }
});

class Navbar extends Component {
    state = {
        anchorMenu: null,
        open: false,
        anchorMenuAccount: null,
        expanded: null,
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false, expanded: false });
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleMenuAccount = event => {
        this.setState({ anchorMenuAccount: event.currentTarget });

    };

    handleCloseMenuAccount = () => {
        this.setState({ anchorMenuAccount: null, expanded: false });
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    render() {
        const { classes } = this.props;
        const { anchorMenu, anchorMenuAccount, expanded } = this.state;
        // const openMenu = Boolean(anchorMenu);
        // const openMenuAccount = Boolean(anchorMenuAccount);
        // const openEvent = Boolean(expanded);
        return (

            <div className={classes.root} >
                <AppBar position="static">
                    <Toolbar className={classes.menu}>
                        <OurMenu className={classes.menuButton} />
                        <AccountManager className={classes.account} />
                    </Toolbar>
                </AppBar>
            </div>


        );
    }
}

//export default Navbar;

export default withStyles(styles)(Navbar);
