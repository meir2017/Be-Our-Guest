import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import axios from 'axios';
import MyModal from './Modal';

import { observer, inject } from 'mobx-react';


const styles = theme => ({
  addIcon: {
    marginRight: theme.spacing.unit,
  }

});


@inject("store")
@observer
class CreateGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      email: "",
      phone: "",
      category: "",
      categoryName: "",
      invited: 0,
      coming: 0,
      notComing: 0
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      [event.target.name]: event.target.selectedOptions[0].innerText
    });
  };

  onChangeText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleRemoveGuest = (e) => {
    //console.log(JSON.stringify(itemguest))
    console.log(("Guest " + e.target.name + " will be deleted"))
    let index = e.target.name;
    let guestId = this.props.store.user.guests[index]._id;
    axios.delete(`/beOurGuest/removeGuest/${this.props.store.user._Id}/${guestId}/`)
      .then(response => {
        console.log((response.data))
        this.store.removGuest(e.target.name)
      })
  }

  handleSaveGuest = (e) => {
    this.toggle();
    e.preventDefault();
    console.log(this.props.store.user.UserId)
    // app.post('/beOurGuest/addNewGuest/:userId/:eventId/', (req, res) => {
    axios.post(
      '/beOurGuest/addNewGuest/' + this.props.store.user._Id +
      '/' + this.props.store.user.events[this.props.store.eventIndex]._id,
      this.state)
      .then(response => {
        if (response === null) {
          console.log("Failed to add new guest!");
        }
        else {
          console.log("New globalGuest " + response.data.globalGuestId);
          console.log("New guest " + response.data.guestId);
          this.props.store.addGuest(response.data)
        }
      })
      .catch(err => console.log('Error: ', err));
  }

  categoryListElements = () => {
    this.props.store.user.categories.map((category, index) => {
      return (
        <MenuItem value={index}>{category.name}</MenuItem>
      )
    })
  }

  displayCategoryName = guest => {
    let category = this.props.store.user.categories.find(category => category._id === guest.categories[0]);
    return category.name;
  }

  render() {
    let { classes } = this.props;
    return (
      <div>
        <Button variant="extendedFab" color="primary" aria-label="Add" onClick={this.toggle}>
          <AddIcon className={classes.addIcon} />
          Add Guest
        </Button>

        {this.state.modal &&
          <MyModal >
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="CreateNewguest">
              <ModalHeader toggle={this.toggle}>Create New Guest</ModalHeader>
              <ModalBody>
                <TextField
                  id="name" label="Name" type="text" className="textField"
                  name="name" onChange={this.onChangeText} value={this.inputText}
                />
                <br />
                <TextField
                  id="email" label="Email" type="email" className="textField"
                  name="email" onChange={this.onChangeText} value={this.inputText}
                />
                <br />
                <TextField
                  id="phone" label="Phone" type="text" className="textField"
                  name="phone" onChange={this.onChangeText} value={this.inputText}
                />
                <br />
                <br />

                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  native
                  label="Category"
                  value={this.state.category}
                  id="category"
                  name="categoryName"
                  onChange={this.handleChange} >
                  <option value="Category" />
                  {this.props.store.user.categories.map((item, index) => {
                    return <option key={item._id} value={item._id} data-name={item.name}>{item.name}</option>
                  })}
                </Select>
                <br />

                <TextField
                  id="invited" label="Invited" type="number" className="textField"
                  name="invited" onChange={this.onChangeText} value={this.inputText}
                />
                <br />
                <TextField
                  id="coming" label="Coming" type="number" className="textField"
                  name="coming" onChange={this.onChangeText} value={this.inputText}
                />
                <br />
                <TextField
                  id="notComing" label="Not coming" type="number" className="textField"
                  name="notComing" onChange={this.onChangeText} value={this.inputText}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleSaveGuest}>Save Guest</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </MyModal>}

      </div>
    );
  }
}


CreateGuest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateGuest);