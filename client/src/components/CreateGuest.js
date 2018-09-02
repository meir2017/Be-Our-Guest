import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import MyModal from './Modal';

import { observer, inject } from 'mobx-react';


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
      invited: 0,
      coming: 0,
      notComing: 0
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
    this.props.store.user.categories.map((caterory, index) => {
      return (
        <MenuItem value={index}>{caterory.name}</MenuItem>
      )
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}><AddIcon /></Button>
        <br /> <br />
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
                  name="category"
                  onChange={this.handleChange} >
                  <option value="Category" />
                  {this.props.store.user.categories.map((item, index) => {
                    return <option key={item._id} value={item._id}>{item.name}</option>
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

export default CreateGuest;