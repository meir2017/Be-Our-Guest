import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import GuestManager from './GuestManager';
import TableManager from './TableManager';
import InvitationManager from './InvitationManager';

//tabs desgin
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class EventManager extends React.Component {
  state = {
    value: 'one',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab value="one" label="Guests" />
            <Tab value="two" label="Tables" />
            <Tab value="three" label="Invitations" />
          </Tabs>
        </AppBar>
        {value === 'one' && <TabContainer><GuestManager /></TabContainer>}
        {value === 'two' && <TabContainer><TableManager /></TabContainer>}
        {value === 'three' && <TabContainer><InvitationManager /></TabContainer>}
      </div>
    );
  }
}

EventManager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventManager);