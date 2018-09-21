import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import MyModal from './Modal';
import AddIcon from '@material-ui/icons/Add';
import { observer, inject } from 'mobx-react';

import {
  Button,
  IconButton,
  withStyles,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    fontSize: 12
  },
})


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
    // this.toggle = this.toggle.bind(this);
  }

  onChangeText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });

    // this.props.openModalCategory()
  }

  handleClose = () => {
    this.setState({
      name: '',
      colorCode: "",
      modal: false,
    });
  }

  handlerSaveCategory = (e) => {
    e.preventDefault();
    let userId = this.props.store.user._Id;
    axios.post('/beOurGuest/addNewCategory/' + userId, this.state)
      .then(response => {
        console.log(" new Category ->id  =" + response.data._id)
        this.props.store.addCategory(response.data)
      })
      .catch(err => console.log('Error: ', err));
    this.handleClose();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton aria-label="add" className={classes.iconButton} onClick={this.toggle} >
          <AddIcon className={classes.icon} />
        </IconButton>
        <Modal style={{ width: "300px" }} isOpen={this.state.modal} toggle={this.toggle} className="CreateNewCategory">
          <form action="" onSubmit={this.handlerSaveCategory}>
            <ModalHeader toggle={this.toggle}>Create New Category</ModalHeader>
            <ModalBody>
              <TextField
                required
                id="name"
                label="Category Name"
                type="text"
                className={classes.textField}
                value={this.state.name}
                onChange={this.onChangeText}
                name="name"
              />
              <br />
              <label htmlFor="colorCode" style={{ padding: "20px" }}>color: </label>

              <input type="color" required onChange={this.onChangeText} value={this.colorCode} name="colorCode" name="colorCode" id="colorCode" />

              <br />
            </ModalBody>
            <ModalFooter>
              <Button size="small" variant="contained" color="secondary" type="Submit"> Save </Button>
              <Button size="small" variant="contained"  onClick={this.handleClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}


export default withStyles(styles)(CreateCategory);