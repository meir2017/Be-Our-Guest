
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CreateEvent from './CreateEvent';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

// import classNames from 'classnames';
import {
  withStyles, ClickAwayListener, Typography, Grow, Paper, Popper,
  Divider, MenuItem, MenuList, IconButton, Icon, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary, ListItem, List, ListItemText,

} from "@material-ui/core"

import MenuIcon from '@material-ui/icons/Menu';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateCategory from './CreateCategory';

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
      modalRemove: false,
      modalEdit: false,
      myEvent: ""
    };

    // this.handlerRemoveEvent = this.handlerRemoveEvent.bind(this);
  }

  myIndex = (e) => {
    e.preventDefault();
    console.log(e.target.id)
    this.setState({ myEvent: e.target.id })
    // this.props.store.theInvitationIndex(e.target.id)
  }

  toggleEditeEvent = () => {
    this.setState({
      modalEdit: !this.state.modalEdit
    });
  }
  toggleRemove = () => {
    this.setState({
      modalRemove: !this.state.modalRemove
    });
  }

  handlerRemoveEvent = (e) => {
    e.preventDefault();
    console.log(e)
    // console.log((" Will be deleted  =" + e.target.id))
    let index = this.state.myEvent;

    let eventId = this.props.store.user.events[index]._id;
    console.log("index  " + index)
    console.log("eventId  " + eventId)

    axios.delete(`/beOurGuest/removEvent/${this.props.store.user._Id}/${eventId}/${index}/`)
      .then(response => {
        console.log((response.data))
        this.props.store.removEvent(index)
        this.handleClose(e)
      })
    this.props.store.thisEventIndex(null)

    this.toggleRemove();
  }



  openModalCreate = (e) => {
    this.setState({ modalCreate: !this.state.modalCreate });
    // this.handleClose(e)
  }
  openModalCategory = (e) => {
    this.setState({ modalCategory: !this.state.modalCategory });
    // this.handleClose(e)
  }
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false, expanded: false });
  };

  handleToggle = () => {
    if (this.props.store.user.userLog)
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

  handleEvent = (index) => {
    this.props.store.thisEventIndex(index)

  }

  render() {
    const { classes } = this.props;
    const { open, expanded } = this.state;
    // const { anchorMenu, open, anchorMenuAccount, expanded } = this.state;
    // const openMenu = Boolean(anchorMenu);
    // const openMenuAccount = Boolean(anchorMenuAccount);
    // const openEvent = Boolean(expanded);
    return (

      <div className={classes.root} id="x1">

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
                    <MenuItem onClick={this.handleClose} onClick={this.openModalCreate} >Create Event</MenuItem>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Select Event</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <List className={classes.rootList} subheader={<li />}>
                          <ul>
                            {this.props.store.user.events.map((eve, index) => {
                              return <ListItem key={eve.HostName + eve.Location + index}
                                name={index} className="itemEvent" button divider disableGutters>

                                <ListItemText id={index} onClick={(e) => { this.handleEvent(index), this.handleClose(e) }} primary={eve.Title} />

                                <Divider />
                                <IconButton onClick={this.handleClose} className={classes.button} aria-label="Edit">
                                  <Icon onClick={e => { this.myIndex(e); this.toggleEditeEvent() }} id={index} >edit_icon</Icon>
                                </IconButton>
                                <IconButton aria-label="Delete">
                                  <i className="far fa-trash-alt" id={index} style={{ color: "black" }} onClick={e => { this.myIndex(e); this.toggleRemove() }}></i>
                                </IconButton>
                              </ListItem>
                            })}
                          </ul>
                        </List>

                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <MenuItem onClick={this.handleClose} onClick={this.openModalCategory}  >Create categories</MenuItem>
                    <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Select Category</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <List className={classes.rootList} subheader={<li />}>
                          <ul>
                            {this.props.store.user.categories.map((item, index) => {
                              return <ListItem key={item._id}
                                name={index} className="itemcategories" button divider disableGutters>

                                <ListItemText id={index} onClick={(e) => { this.handleClose(e) }} primary={item.name} />

                                <Divider />
                                <IconButton onClick={this.handleClose} className={classes.button} >
                                  <i className="fas fa-circle" style={{ color: item.colorCode }}></i>
                                </IconButton>
                              </ListItem>
                            })}
                          </ul>
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <CreateEvent openModalCreate={this.openModalCreate}
          modalCreate={this.state.modalCreate} />
        <CreateCategory openModalCategory={this.openModalCategory}
          modalCategory={this.state.modalCategory} />
        <div>
          <Modal className="modalm" style={{ width: "240px" }} isOpen={this.state.modalRemove} toggle={this.toggleRemove}>
            <ModalHeader toggle={this.toggle}>Do you want to delete this evente?</ModalHeader>
            <ModalFooter className="btnSend" >
              <Button onClick={this.handlerRemoveEvent} color="primary">Yes</Button>
              <Button onClick={this.toggleRemove} color="secondary" style={{ marginLeft: "40px" }}>No</Button>
            </ModalFooter>

          </Modal>
        </div>
        <div>
          <Modal style={{ width: "350px" }} isOpen={this.state.modalEdit} toggle={this.toggleEditeEvent} className="editEvent">
            <ModalHeader toggle={this.toggleEditeEvent}>Edite Event</ModalHeader>
            <ModalBody>
              <TextField
                id="Title" label="Title" type="text" className="textField"
                name="Title" onChange={this.onChangeText} value={this.inputText}
              />
              <br />
              <TextField
                id="Date" label="Date" type="date" className="textField"
                name="Date" onChange={this.onChangeText} value={this.inputText}
              />
              <br />
              <TextField
                id="Location" label="Location" type="text" className="textField"
                name="Location" onChange={this.onChangeText} value={this.inputText}
              />
              <br />
              <TextField
                id="maxGuests" label="Max guests" type="number" className="textField"
                name="maxGuests" onChange={this.onChangeText} value={this.inputText}
              />
              <br />
              <TextField
                id="HostName" label="Host name" type="text" className="textField"
                name="HostName" onChange={this.onChangeText} value={this.inputText}
              />
              <br />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleEditeEvent}>Save Change</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditeEvent}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(OurMenu);
