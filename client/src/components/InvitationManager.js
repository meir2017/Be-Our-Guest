import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Invitation from './Invitation';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
  
function InvitationManager(props) {
    const { classes } = props;
    return (
        <div className="container">

            <Invitation />
            
            <div className="invites-list">
                <h4>Invites</h4>
                <p>Save the Date</p>
                <p>Invitations Reminder</p>
            </div>
            <div className="new-button">
                <Button variant="outlined" color="primary" className={classes.button}>
                New Invitation
                </Button>
            </div>
            <input
                accept="image/*"
                className={classes.input}
                id="outlined-button-file"
                multiple
                type="file"
            />
        </div>
    );
}

InvitationManager.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InvitationManager);  
