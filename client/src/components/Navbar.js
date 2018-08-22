import React, { Component } from 'react';
import classNames from 'classnames';
import {
    AppBar,
    withStyles,
    createMuiTheme,
    ClickAwayListener,
    MuiThemeProvider,
    Toolbar,
    Typography,
    TextField,
    Button,
    Badge,
    Grow,
    Paper,
    Popper,
    Divider,
    Menu,
    MenuItem,
    MenuList,
    IconButton,
    Icon,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    ExpansionPanelActions,
    ListItem,
    List,
    ListItemText,
    ListSubheader,
    ListItemIcon,
    ListItemSecondaryAction
} from "@material-ui/core"

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        const { anchorMenu, open, anchorMenuAccount, expanded } = this.state;
        const openMenu = Boolean(anchorMenu);
        const openMenuAccount = Boolean(anchorMenuAccount);
        const openEvent = Boolean(expanded);
        return (

            <div className={classes.root} >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}
                            aria-owns={open ? "mainMenu-appbar" : null}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                            className={classes.menuButton}
                            aria-label="Menu"
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="mainMenu-appbar"
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                    <Paper className={classes.paper}>
                                        <ClickAwayListener onClickAway={this.handleClose}>
                                            <MenuList>
                                                <MenuItem onClick={this.handleClose} >Create Event</MenuItem>
                                                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.heading}>Select Event</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <List className={classes.rootList} subheader={<li />}>
                                                            {[0, 1, 2, 3, 4].map(sectionId => (
                                                                <li key={`section-${sectionId}`} className={classes.listSection}>
                                                                    <ul className={classes.ul}>
                                                                        <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                                                                        {[0, 1, 2].map(item => (

                                                                            <ListItem key={`item-${sectionId}-${item}`} button divider disableGutters>

                                                                                <ListItemText primary={`Item ${item}`}>

                                                                                </ListItemText>
                                                                                <Divider />
                                                                                <ListItemSecondaryAction>
                                                                                    <IconButton aria-label="Delete">
                                                                                        <DeleteIcon />
                                                                                    </IconButton>
                                                                                    <IconButton className={classes.button} aria-label="Edit">
                                                                                        <Icon>edit_icon</Icon>
                                                                                    </IconButton>
                                                                                </ListItemSecondaryAction>
                                                                            </ListItem>
                                                                        ))}
                                                                    </ul>
                                                                </li>
                                                            ))}
                                                        </List>

                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <MenuItem onClick={this.handleClose} >Create Category</MenuItem>
                                                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.heading}>Select Category</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <myList props={classes} />
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>

                        <IconButton
                            aria-owns={openMenuAccount ? "menuAccount-appbar" : null}
                            aria-haspopup="true"
                            onClick={this.handleMenuAccount}
                            className={classes.menuAccountButton}
                            aria-label="Menu"
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
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
                            <MenuItem onClick={this.handleCloseMenuAccount}>Logout</MenuItem>
                            <MenuItem onClick={this.handleCloseMenuAccount}>Profile</MenuItem>
                            <MenuItem onClick={this.handleCloseMenuAccount}>My account</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

//export default Navbar;

export default withStyles(styles)(Navbar);
