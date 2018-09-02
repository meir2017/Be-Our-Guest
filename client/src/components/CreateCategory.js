

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MyModal from './Modal';

import { observer, inject } from 'mobx-react';


@inject("store")
@observer
class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: String,
      colorCode: String
    };
    this.toggle = this.toggle.bind(this);
  }

  onChangeText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  toggle() {
    this.props.openModalCategory()
  }

  handlerSaveCategory = (e) => {
    this.toggle();
    e.preventDefault();
    let userId = this.props.store.user._Id;
    axios.post('/beOurGuest/addNewCategory/' + userId, this.state)
    .then(response => {

      console.log(" new Category ->id  =" + response.data._id)
      this.props.store.addCategory(response.data)

    })
    .catch(err => console.log('Error: ', err));
  }
  render() {
    return (
      <div>
        <MyModal >
          <Modal isOpen={this.props.modalCategory} toggle={this.toggle} className="CreateNewCategory">
            <ModalHeader toggle={this.toggle}>Create New Category</ModalHeader>
            <ModalBody>
              <TextField
                id="name" label=" Category Name" type="text" className="textField"
                name="name" onChange={this.onChangeText} value={this.name}
              />
              <br />

              <br />
              <label htmlFor="colorCode" style={{ padding: "20px" }}>color: </label>

              <input type="color" onChange={this.onChangeText} value={this.colorCode} name="colorCode" id="colorCode" />

              <br />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handlerSaveCategory}>Save category</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </MyModal>
      </div>
    );
  }
}

export default CreateCategory;