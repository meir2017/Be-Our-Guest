import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CreateEvent from './CreateEvent';
import CreateCategory from './CreateCategory';
import axios from 'axios';
import {
  Button, AppBar, Drawer, Divider, withStyles, BottomNavigation, BottomNavigationAction, ClickAwayListener, Grow, Paper, Popper,
  MenuItem, MenuList, IconButton, ExpansionPanel, ExpansionPanelSummary,
  Popover, ExpansionPanelDetails, Icon, ListItem, List, ListItemText, Toolbar, Typography,

} from "@material-ui/core"

import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import AddIcon from '@material-ui/icons/Add'
import Collapsible from './Collapsible';
import CollapsibleItem from './CollapsibleItem';
//import Button from './Button';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';

const drawerWidth = 340;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  rootList: {
    //  marginLeft: 100,
    //  width: '100%',
    // maxWidth: 260,
    //  backgroundColor: theme.palette.background.paper,
    //   position: 'relative',
    // overflow: 'auto',
    //maxHeight: 300,
  },

  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  ListItem: {
    height: 35,
  },
  button: {
    margin: theme.spacing.unit,
    //  height: 20,
    //width: 10
  },
  buttonNav:{
    fill: 'Transparent',
  },
  iconButton: {
    height: 35,
    width: 35,
    
  },
  icon: {
    height: 20,
    width: 20,
  },
  toolbar: theme.mixins.toolbar,
});

@inject("store")
@observer
class ClippedDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreate: false,
      modalCategory: false,
    };

  }
  handleDeleteEvent = (e) => {
    e.preventDefault();
    let index = e.target.id;
    let eventId = this.props.store.user.events[index]._id;
    axios.delete(`/beOurGuest/removEvent/${this.props.store.user._Id}/${eventId}/${index}/`)
      .then(response => {
        // console.log((response.data))
        this.props.store.removEvent(index)
        this.handleClose(e)
      })
  }
  openModalCreate = (e) => {
    this.setState({ modalCreate: !this.state.modalCreate });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Be Uor Guest
                        </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}            >
          <div className={classes.toolbar} />
          <Collapsible>
            <CollapsibleItem header='Events' icon='event'>
              <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                <AddIcon />
              </Button>
              {/* <Button waves='light' large icon='add' onClick={this.openModalCreate}> Create</Button> */}
              <List className={classes.rootList} subheader={<li />}>
                <ul>
                  {this.props.store.user.events.map((event, index) => {
                    return (
                      <ListItem key={event.HostName + event.Location + index}
                        name={index} className={classes.ListItem} button divider disableGutters >
                        <ListItemText
                          id={index}
                          onClick={(e) => { this.handleEvent(index); this.handleClose(e) }}
                          primary={event.Title} />
                        <Divider />
                        <IconButton aria-label="Edit" className={classes.iconButton} onClick={this.handleEditEvent}>
                          <EditIcon className={classes.icon} />
                        </IconButton>
                        <IconButton aria-label="Delete" className={classes.iconButton} onClick={this.handleDeleteEvent} >
                          <ClearIcon className={classes.icon} />
                        </IconButton>

                        {/* <IconButton onClick={this.handleClose} className={classes.button} aria-label="Edit">
                                                    <Icon onClick={this.handleEdit} id={index} >edit_icon</Icon>
                                                </IconButton>
                                                <IconButton aria-label="Delete">
                                                    <i className="far fa-trash-alt" id={index} style={{ color: "black" }} onClick={this.handlerRemoveEvent}></i>
                                                </IconButton> */}

                      </ListItem>
                    )
                  })}
                </ul>
              </List>
            </CollapsibleItem>
            <CollapsibleItem header='Categories' icon='bookmark_border'>
              <Button variant="outlined" color="primary" className={classes.button}>
                Add new
      </Button>
              <List className={classes.rootList} subheader={<li />}>
                <ul>
                  {this.props.store.user.events.map((event, index) => {
                    return (
                      <ListItem key={event.HostName + event.Location + index}
                        name={index} className={classes.ListItem} button divider disableGutters >
                        <ListItemText
                          id={index}
                          onClick={(e) => { this.handleEvent(index); this.handleClose(e) }}
                          primary={event.Title} />
                        <Divider />
                        <IconButton aria-label="Edit" className={classes.iconButton} onClick={this.handleEditEvent}>
                          <EditIcon className={classes.icon} />
                        </IconButton>
                        <IconButton aria-label="Delete" className={classes.iconButton} onClick={this.handleDeleteEvent} >
                          <ClearIcon className={classes.icon} />
                        </IconButton>

                        {/* <IconButton onClick={this.handleClose} className={classes.button} aria-label="Edit">
                                                    <Icon onClick={this.handleEdit} id={index} >edit_icon</Icon>
                                                </IconButton>
                                                <IconButton aria-label="Delete">
                                                    <i className="far fa-trash-alt" id={index} style={{ color: "black" }} onClick={this.handlerRemoveEvent}></i>
                                                </IconButton> */}

                      </ListItem>
                    )
                  })}
                </ul>
              </List>
            </CollapsibleItem>
            <CollapsibleItem header='Guests' icon='supervisor_account'>
              <BottomNavigation
                onChange={this.handleChange}
                showLabels
                className={classes.buttonNav}
                BottomNavigation>
                <cAction  label="Create new" icon={<AddIcon />}  className={classes.buttonNav} />
              </BottomNavigation>
              <List className={classes.rootList} subheader={<li />}>
                <ul>
                  {this.props.store.user.events.map((event, index) => {
                    return (
                      <ListItem key={event.HostName + event.Location + index}
                        name={index} className={classes.ListItem} button divider disableGutters >
                        <ListItemText
                          id={index}
                          onClick={(e) => { this.handleEvent(index); this.handleClose(e) }}
                          primary={event.Title} />
                        <Divider />
                        <IconButton aria-label="Edit" className={classes.iconButton} onClick={this.handleEditEvent}>
                          <EditIcon className={classes.icon} />
                        </IconButton>
                        <IconButton aria-label="Delete" className={classes.iconButton} onClick={this.handleDeleteEvent} >
                          <ClearIcon className={classes.icon} />
                        </IconButton>

                        {/* <IconButton onClick={this.handleClose} className={classes.button} aria-label="Edit">
                                                    <Icon onClick={this.handleEdit} id={index} >edit_icon</Icon>
                                                </IconButton>
                                                <IconButton aria-label="Delete">
                                                    <i className="far fa-trash-alt" id={index} style={{ color: "black" }} onClick={this.handlerRemoveEvent}></i>
                                                </IconButton> */}

                      </ListItem>
                    )
                  })}
                </ul>
              </List>
            </CollapsibleItem>
            <CollapsibleItem header='Invitation' icon='group_add'> <List className={classes.rootList} subheader={<li />}>
              <ul>
                {this.props.store.user.events.map((event, index) => {
                  return (
                    <ListItem key={event.HostName + event.Location + index}
                      name={index} className={classes.ListItem} button divider disableGutters >
                      <ListItemText
                        id={index}
                        onClick={(e) => { this.handleEvent(index); this.handleClose(e) }}
                        primary={event.Title} />
                      <Divider />
                      <IconButton aria-label="Edit" className={classes.iconButton} onClick={this.handleEditEvent}>
                        <EditIcon className={classes.icon} />
                      </IconButton>
                      <IconButton aria-label="Delete" className={classes.iconButton} onClick={this.handleDeleteEvent} >
                        <ClearIcon className={classes.icon} />
                      </IconButton>

                      {/* <IconButton onClick={this.handleClose} className={classes.button} aria-label="Edit">
                                                    <Icon onClick={this.handleEdit} id={index} >edit_icon</Icon>
                                                </IconButton>
                                                <IconButton aria-label="Delete">
                                                    <i className="far fa-trash-alt" id={index} style={{ color: "black" }} onClick={this.handlerRemoveEvent}></i>
                                                </IconButton> */}

                    </ListItem>
                  )
                })}
              </ul>
            </List>
            </CollapsibleItem>
            <CollapsibleItem header='Tebles' icon='view_carousel'>
              Lorem ipsum dolor sit amet.
                    </CollapsibleItem>
            <CollapsibleItem header='Invitation' icon='drafts'>
              Lorem ipsum dolor sit amet.
                    </CollapsibleItem>
          </Collapsible>

          {/* <List>{mailFolderListItems}</List>
                        <Divider />
                                <List>{otherMailFolderListItems}</List>*/}
        </Drawer>
        {/* <main className={classes.content}>      
             <div className={classes.toolbar} />
                     <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
              </main> */}
        <CreateEvent openModalCreate={this.openModalCreate}
          modalCreate={this.state.modalCreate} />
        <CreateCategory openModalCategory={this.openModalCategory}
          modalCategory={this.state.modalCategory} />
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);