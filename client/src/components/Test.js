// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

// const styles = theme => ({
//     root: {
//         display: "flex",
//         flexWrap: "wrap"
//     },
//     formControl: {
//         margin: theme.spacing.unit,
//         minWidth: 120
//     },
//     selectEmpty: {
//         marginTop: theme.spacing.unit * 2
//     }
// });

// class SimpleSelect extends React.Component {
//     state = {
//         event: "",
//         name: "hai"
//     };

//     handleChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//     };

//     render() {
//         const { classes } = this.props;

//         return (
//             <form className={classes.root} autoComplete="off">
//                 <FormControl className={classes.formControl}>
//                     <Select
//                         value={this.state.event}
//                         onChange={this.handleChange}
//                         inputProps={{
//                             name: "event",
//                             id: "age-simple"
//                         }}
//                     >
//                         <MenuItem value="">
//                             <em>My Event</em>
//                         </MenuItem>
//                         <MenuItem value={10}>Ten</MenuItem>
//                         <MenuItem value={20}>Twenty</MenuItem>
//                         <MenuItem value={30}>Thirty</MenuItem>
//                     </Select>
//                 </FormControl>
//             </form>
//         );
//     }
// }

// SimpleSelect.propTypes = {
//     classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(SimpleSelect);





























import React from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { observer, inject } from 'mobx-react';


@inject("store")
@observer
export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    myEvent = () => {
        this.props.store.user.events.map((eve, index) => {
            return <DropdownItem name={index} key={eve.HostName + eve.Location + index} id={index}
                onClick={(e) => { this.handleEvent(index) }} >    {eve.Title}</DropdownItem>
        })
    }

    handleEvent = (index) => {
        this.props.store.thisEventIndex(index)
        this.props.store.ChangeMyEventPage(true)

    }

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} className="dropdownOpen" toggle={this.toggle}>
                <DropdownToggle caret className="btn-dropdown" >
                    My Events
                </DropdownToggle>

                <DropdownMenu>
                    {this.props.store.user.events.length === 0 ? <DropdownItem> No events </DropdownItem> : this.props.store.user.events.map((eve, index) => {
                        return <DropdownItem name={index} key={eve.HostName + eve.Location + index} id={index}
                            onClick={(e) => { this.handleEvent(index) }} >    {eve.Title}</DropdownItem>
                    })}
                </DropdownMenu>
            </ButtonDropdown >
        );
    }
}