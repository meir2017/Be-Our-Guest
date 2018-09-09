import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
    root: {
        width: 500,
        // backgroundColor: "#c7e0ec"
    },
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        if (value == 0) {
            console.log("login ")
        }
        else
            console.log("Register")

        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Login" />
                <BottomNavigationAction label="Register" />
            </BottomNavigation>
        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);