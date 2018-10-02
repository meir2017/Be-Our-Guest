import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { observer, inject } from 'mobx-react';

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    }
});

@inject("store")
@observer
class SimpleSelect extends React.Component {
    state = {
        event: "Select Event",
        name: "hai"
    };

    handleChange = event => {
        // this.setState({ [event.target.name]: event.target.value });
        if (event.target.value !== null) {
            this.props.store.thisEventIndex(event.target.value)
            this.props.store.ChangeMyEventPage(true)
            this.props.store.ChangeMyCategoryPage(true)
        }
    };

    componentDidMount() {
        this.setState({ event: this.props.store.eventIndex });
    }
    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root}
                autoComplete="off" style={{ color: "white" }}>
                <FormControl className={classes.formControl} id="SelectEvent">
                    <Select
                        className="SelectEvent"
                        style={{ color: "white" }}
                        value={this.state.event}
                        onChange={this.handleChange}
                        value={this.props.store.eventIndex}
                        displayEmpty
                        name="event"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value={null}>
                            <em>Select Event</em>
                        </MenuItem>
                        {this.props.store.user.events.length === 0 ? <MenuItem value={null}> No events </MenuItem> : this.props.store.user.events.map((eve, index) => {
                            return <MenuItem value={index} key={eve.HostName + eve.Location + index} id={index}
                            >    {eve.Title}</MenuItem>
                        })}

                    </Select>
                </FormControl>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
