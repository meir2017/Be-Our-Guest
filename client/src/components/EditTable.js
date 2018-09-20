import React, { Component } from 'react';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { observer, inject } from 'mobx-react';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import {
  Divider,
  Popover,
  withStyles,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,

} from '@material-ui/core';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    fontSize: 15
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
  iconButton: {
    height: 20,
    width: 20,
  },
  icon: {
    height: 15,
    width: 15,
  },
});

@inject("store")
@observer
class EditTableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      tableName: '',
      tableSize: '',
      categories: [],
      Guests: [],
    }
  }

  handleToggle = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({
      tableName: '',
      tableSize: "",
      category: '',
      Guests: [],
      open: false,
      anchorEl: null
    });
  }
  handleTextChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  onChangeCategory = e => {
    this.setState({ category: e.target.value });
    // let category = this.props.store.user.categories.find(category => category._id === e.target.value);
    // this.setState({ tableName: category.name });
  }
  editTable = e => {
    e.preventDefault();
    let store = this.props.store;
    let tableInfo = {
      title: this.state.tableName,
      maxGuests: this.state.tableSize,
      category: this.state.category,
    }
    axios.post('/beOurGuest/updateTable/' + store.user.events[store.eventIndex]._id, tableInfo)
      .then(response => {

        console.log(" updete Table ->id  =" + response.data._id)
        this.props.store.updateTable(response.data, '');

      })
      .catch(err => console.log('Error: ', err));
    this.handleToggle();
  }

render() {
  const { classes } = this.props;
  const { anchorEl } = this.state;
  const open = Boolean(anchorEl);
  console.log( this.props.table);
  let category = this.props.store.user.categories.find(category => category._id === this.props.table.category);
  return (
    <React.Fragment>
      <IconButton
        aria-owns={open ? 'render-props-popover' : null}
        aria-haspopup="true"
        variant="contained"
        onClick={this.handleToggle}
        // onClick={event => {
        //   updateAnchorEl(event.currentTarget);
        // }}
        aria-label="Edit" className={classes.iconButton} >
        <EditIcon className={classes.icon} />
      </IconButton>
      <Popover
        id="render-props-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={this.handleClose}
        // onClose={() => {
        //   updateAnchorEl(null);
        // }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <form className={classes.container} noValidate autoComplete="off" align="center">
          <FormControl className={classes.formControl} align="left">
            <FormControl required>
              <InputLabel shrink htmlFor="category">Select category</InputLabel>
              <Select
                defaultValue={category.name}
                displayEmpty
                onChange={this.onChangeCategory}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
                displayEmpty
                autoWidth >

                {this.props.store.user.categories.map((item, index) => {
                  return <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
                })}

              </Select>
            </FormControl>
            <TextField
              id="tableName"
              label="Table name"
              type="text"
              className={classes.textField}
              placeholder="Enter table name"
              defaultValue={this.props.table.title}
              onChange={this.handleTextChange}
              margin="normal" />
            <TextField
              id="tableSize"
              label="Max number of guests"
              type="number"
              defaultValue={this.props.table.maxGuests}
              required
              placeholder="Enter number of places"
              onChange={this.handleTextChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal" />
            <Divider></Divider>
            <Button size="small" onClick={this.handleClose}>Cancel</Button>
            <Button size="small" color="primary" onClick={this.editTable} > Save </Button>
          </FormControl>
        </form>
      </Popover>
    </React.Fragment>
  );
}

}

export default withStyles(styles)(EditTableModal);
