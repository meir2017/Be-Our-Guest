
import React, { Component } from 'react';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { observer, inject } from 'mobx-react';
import CreateEvent from './CreateEvent';
import axios from 'axios';

// import classNames from 'classnames';
import {
  withStyles, ClickAwayListener, Typography, Grow, Paper, Popper,
  Divider, MenuItem, MenuList, IconButton, Icon, ExpansionPanel,
  Popover, ExpansionPanelDetails, ExpansionPanelSummary, ListItem, List, ListItemText,

} from "@material-ui/core"

import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateCategory from './CreateCategory';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  menuButton: {
    // marginLeft: -12,
    // marginRight: 20
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

@inject("store")
@observer
class OurMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorMenu: null,
      open: false,
      anchorMenuAccount: null,
      expanded: null,
      modalCreate: false,
      modalCategory: false,
    };

    // this.handlerRemoveEvent = this.handlerRemoveEvent.bind(this);
  }


  openModalCreate = (e) => {
    this.setState({ modalCreate: !this.state.modalCreate });
    this.handleClose(e);
  }
  openModalCategory = (e) => {
    this.setState({ modalCategory: !this.state.modalCategory });
   this.handleClose(e);
  }
  handleClose = event => {
    // if (this.anchorEl.contains(event.target)) {
    //   return;
    // }
    this.setState({ anchorMenu: null, expanded: false });
  };

  handleToggle = event => {
    if (this.props.store.user.userLog)
      this.setState(state => ({ anchorMenu: event.currentTarget }));
  };

  // handleMenuAccount = event => {
  //   this.setState({ anchorMenuAccount: event.currentTarget });
  // };

  // handleCloseMenuAccount = () => {
  //   this.setState({ anchorMenuAccount: null, expanded: false });
  // };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handlerRemoveEvent = (e) => {
    e.preventDefault();
    // console.log((" Will be deleted  =" + e.target.id))
    let index = e.target.id;
    let eventId = this.props.store.user.events[index]._id;
    axios.delete(`/beOurGuest/removEvent/${this.props.store.user._Id}/${eventId}/${index}/`)
      .then(response => {
        console.log((response.data))
        this.props.store.removEvent(index)
        this.handleClose(e)
      })
  }

  handleEdit = (e) => {
    e.preventDefault();
    alert("e.target.id; " + e.target.id);
  }

  handleEvent = (index) => {
    this.props.store.thisEventIndex(index)
  }

  render() {
    const { classes } = this.props;
    const {  expanded, anchorMenu } = this.state;
    const open = Boolean(anchorMenu);
          return (
            <div className={classes.root} id="x1">
              <IconButton
                aria-owns={open ? 'render-props-popover' : null}
                aria-haspopup="true"
                variant="contained"
                onClick={this.handleToggle}
                // onClick={event => {
                //   updateAnchorEl(event.currentTarget);
                // }}
                aria-label="Menu"
                className={classes.menuButton}
                color="inherit" >
                <MenuIcon />
              </IconButton>

              <Popover
              
                id="render-props-popover"
                open={open}
                anchorEl={anchorMenu}
                onClose={this.handleClose}
                // onClose={() => {
                //   updateAnchorEl(null);
                // }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick= { this.openModalCreate} >
                        Create Event
                </MenuItem>
                      <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>Select Event</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
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
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <MenuItem onClick={this.handleClose} onClick={this.openModalCategory} >Create category</MenuItem>
                      <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>Select Category</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <List className={classes.rootList} subheader={<li />}>
                            <ul>
                              {this.props.store.user.categories.map((item, index) => {
                                return (
                                  <ListItem key={item._id}
                                    name={index} className="itemcategories" button divider disableGutters>

                                    <ListItemText id={index} onClick={(e) => { this.handleClose(e) }} primary={item.name} />

                                    <Divider />
                                    <IconButton onClick={this.handleClose} className={classes.button} >
                                      <i className="fas fa-circle" style={{ color: item.colorCode }}></i>
                                    </IconButton>
                                  </ListItem>
                                )
                              })}
                            </ul>
                          </List>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Popover>
              <CreateEvent openModalCreate={this.openModalCreate}
                modalCreate={this.state.modalCreate} />
              <CreateCategory openModalCategory={this.openModalCategory}
                modalCategory={this.state.modalCategory} />
            </div>
          );
  }
}

//export default Navbar;

export default withStyles(styles)(OurMenu);
