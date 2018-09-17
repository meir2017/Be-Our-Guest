import React, { Component } from 'react';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { observer, inject } from 'mobx-react';
import EditIcon from '@material-ui/icons/Edit';
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
  handleClose = () => {

    this.updateAnchorEl(null);
    this.setState({

      // tableName: '',
      // tableSize: "",
      // category: '',
      // Guests: [],
      // open: false
    });
  };

  // onClose={() => {
  //   updateAnchorEl(null);
  // }}

  constructor() {
    super();
    this.state = {
      tableName: '',
      tableSize: '',
      categories: [],
      Guests: [],
      open: false,
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <WithState>
        {({ anchorEl, updateAnchorEl }) => {
          const open = Boolean(anchorEl);
          return (
            <React.Fragment>
              <IconButton
                aria-owns={open ? 'render-props-popover' : null}
                aria-haspopup="true"
                variant="contained"
                onClick={event => {
                  updateAnchorEl(event.currentTarget);
                }}
                aria-label="Edit" className={classes.iconButton} >
                <EditIcon className={classes.icon} />
              </IconButton>
              {/* <Button
              aria-owns={open ? 'render-props-popover' : null}
              aria-haspopup="true"
              variant="contained"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
              Open Popodgdsgdsver
            </Button> */}
              <Popover
                id="render-props-popover"
                open={open}
                anchorEl={anchorEl}
                onClose={() => {
                  updateAnchorEl(null);
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography className={classes.typography}>The content of the Popover.</Typography>
                <form className={classes.container} noValidate autoComplete="off" align="center">
                  <FormControl className={classes.formControl} align="left">
                    <FormControl required>
                      <InputLabel shrink htmlFor="category">Select category</InputLabel>
                      <Select
                        value={this.state.category}
                        displayEmpty
                        onChange={this.onChangeCategory}
                        inputProps={{
                          name: 'category',
                          id: 'category',
                        }}
                        displayEmpty
                        autoWidth
                      >

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
                      value={this.state.tableName}
                      placeholder="Enter table name"
                      onChange={this.handleTextChange}
                      margin="normal" />
                    <TextField
                      id="tableSize"
                      label="Max number of guests"
                      type="number"
                      required
                      value={this.state.tableSize}
                      placeholder="Enter number of places"
                      onChange={this.handleTextChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal" />
                    <Divider></Divider>
                    <Button size="small" onClick={this.handleClose}>Cancel</Button>
                    <Button size="small" color="primary" onClick={this.addTable} > Save </Button>
                  </FormControl>
                </form>
              </Popover>
            </React.Fragment>
          );
        }}
      </WithState>
    );
  }
}

export default withStyles(styles)(EditTableModal);
