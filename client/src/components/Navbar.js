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
        flexGrow: 1,
    },
    menu: {
        //   display: 'flex',
        flexGrow: 1,
    },

    menuButton: {
        flexGrow: 1,
        //  justifyContent: 'flex-start',
        // marginLeft: -12,
        // marginRight: 20
    },
    account: {
        // flexGrow: 1,        
        // justifyContent: 'flex-end',
    }
    // flex: {
    //     flexGrow: 1
    // },
    // menuAccountButton: {
    //     float: 'right',
    //     //marginRight: 1520,
    //     marginLeft: 1150,
    // },
    // heading: {
    //     fontSize: theme.typography.pxToRem(15),
    //     fontWeight: theme.typography.fontWeightRegular,
    // },
    // paper: {
    //     width: 300,
    // },
    // rootList: {
    //     width: '100%',
    //     maxWidth: 260,
    //     backgroundColor: theme.palette.background.paper,
    //     position: 'relative',
    //     overflow: 'auto',
    //     maxHeight: 300,
    // },
    // listSection: {
    //     backgroundColor: 'inherit',
    // },
    // ul: {
    //     backgroundColor: 'inherit',
    //     padding: 0,
    // },

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
