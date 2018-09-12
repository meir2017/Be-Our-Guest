import React, { Component } from 'react';
// import classNames from 'classnames';
import {
    AppBar,
    withStyles,
    Toolbar,
} from "@material-ui/core"

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
    },
    account: {
        // flexGrow: 1,        
        // justifyContent: 'flex-end',
    }
   
});

class Navbar extends Component {
    
    render() {
        const { classes } = this.props;
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

export default withStyles(styles)(Navbar);
