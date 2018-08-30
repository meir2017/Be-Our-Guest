import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MyModal from './Modal';

import { observable, action } from "mobx";
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
      invited: 0,
      coming: 0,
      notComing: 0
    };
  }

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
        console.log("New globalGuest " + response.data.globalGuestId + " added");
        console.log("New guest " + response.data.guestId + " added");
        this.props.store.addGuest(response.data)
      }
    })
    .catch(err => console.log('Error: ', err));
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
// {this.props.store.user.guests.map((eve, index) => {
//   return (
//     <div key={eve.HostName + eve.Location} index={index} className="guestAll">
//       <Button className="btnguest" name={index}  >{eve.Title} <b>In </b>   {eve.Location}</Button>
//       <br /> <br />
//     </div>
//   )
// })}

export default CreateGuest;