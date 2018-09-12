import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import { observer, inject } from 'mobx-react';
import {
    withStyles, Drawer, ClickAwayListener, Typography, Grow, Paper, Popper,
    Divider, MenuItem, MenuList, IconButton, ExpansionPanel, ExpansionPanelSummary,
    Popover, ExpansionPanelDetails, Icon, ListItem, List, ListItemText,
  
  } from "@material-ui/core"
const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'left',
        justifyContent: 'flex-start',
        textAlign: 'left',
        marginLeft: 12,
        marginRight: 36,
    },
    appFrame: {
        // height: 430,
        // zIndex: 1,
        // overflow: 'hidden',
        // position: 'relative',
        // display: 'flex',
        // width: '100%',
    },
    appBar: {
        // position: 'absolute',
        // transition: theme.transitions.create(['margin', 'width'], {
        //   easing: theme.transitions.easing.sharp,
        //   duration: theme.transitions.duration.leavingScreen,
        // }),
    },
    appBarShift: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     transition: theme.transitions.create(['margin', 'width'], {
        //       easing: theme.transitions.easing.easeOut,
        //       duration: theme.transitions.duration.enteringScreen,
        //     }),
        //   },
        //   'appBarShift-left': {
        //     marginLeft: drawerWidth,
        //   },
        //   'appBarShift-right': {
        //     marginRight: drawerWidth,
    },
    menuButton: {
        textAlign: 'left',
        // marginLeft: 12,
        // marginRight: 20,
        alignItems: 'left',
        justifyContent: 'flex-start'
    },
    hide: {
        // display: 'none',
    },
    drawerPaper: {
        marginTop: 50,
        marginLeft: 100,
        //  position: 'relative',
        width: 200,
    },
    //   drawerHeader: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    //     padding: '0 8px',
    //     ...theme.mixins.toolbar,
    //   },
    //   content: {
    //     flexGrow: 1,
    //     backgroundColor: theme.palette.background.default,
    //     padding: theme.spacing.unit * 3,
    //     transition: theme.transitions.create('margin', {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.leavingScreen,
    //     }),
    //   },
    //   'content-left': {
    //     marginLeft: -drawerWidth,
    //   },
    //   'content-right': {
    //     marginRight: -drawerWidth,
    //   },
    //   contentShift: {
    //     transition: theme.transitions.create('margin', {
    //       easing: theme.transitions.easing.easeOut,
    //       duration: theme.transitions.duration.enteringScreen,
    //     }),
    //   },
    //   'contentShift-left': {
    //     marginLeft: 0,
    //   },
    //   'contentShift-right': {
    //     marginRight: 0,
    //   },
});

@inject("store")
@observer
class PersistentDrawer extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: !this.state.open });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleEventhandleEvent = (index) => {
        this.props.store.thisEventIndex(index)
      }

    render() {
        const { classes, theme } = this.props;
        const { anchor, open } = this.state;

        const drawer = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

                <List className={classes.rootList} subheader={<li />}>
                    <ul>
                        {this.props.store.user.events.map((eve, index) => {
                            return (
                                <ListItem key={eve.HostName + eve.Location + index}
                                    name={index} className="itemEvent" button divider disableGutters
                                >

                                    <ListItemText
                                        id={index}
                                        onClick={(e) => { this.handleEvent(index); this.handleClose(e) }}
                                        primary={eve.Title}
                                    />

                                    <Divider />
                                    <IconButton onClick={this.handleClose} className={classes.button} aria-label="Edit">
                                        <Icon onClick={this.handleEdit} id={index} >edit_icon</Icon>
                                    </IconButton>
                                    <IconButton aria-label="Delete">
                                        <i className="far fa-trash-alt" id={index} style={{ color: "black" }} onClick={this.handlerRemoveEvent}></i>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </ul>
                </List>
                {/* <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>*/}
            </Drawer>
        );

        let before = drawer


        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {before}

                </div>
            </div>
        );
    }
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
