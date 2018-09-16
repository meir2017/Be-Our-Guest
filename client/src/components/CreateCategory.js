

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
          <Modal style={{ width: "300px" }} isOpen={this.props.modalCategory} toggle={this.toggle} className="CreateNewCategory">
            <form action="" onSubmit={this.handlerSaveCategory}>
              <ModalHeader toggle={this.toggle}>Create New Category</ModalHeader>
              <ModalBody>
                <TextField
                  id="name" required label=" Category Name" type="text" className="textField"
                  name="name" onChange={this.onChangeText} value={this.name}
                />
                <br />

                <br />
                <label htmlFor="colorCode" style={{ padding: "20px" }}>color: </label>

                <input type="color" required onChange={this.onChangeText} value={this.colorCode} name="colorCode" name="colorCode" id="colorCode" />

                <br />
              </ModalBody>
              <ModalFooter>
                <Button style={{backgroundColor:'#560027'}} type="Submit" >Save</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </form>
          </Modal>
        </MyModal>
      </div>
    );
  }
}

export default CreateCategory;