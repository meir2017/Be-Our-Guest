

import React, { Component } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import { Button, Form } from 'reactstrap';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

class Rsvp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedB: false,
            numGuest: 0,
            myText: "",
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        // alert(this.state[name])
    };
    handleChangeGuest = name => event => {
        this.setState({ [name]: event.target.value });
        // alert(this.state[name])
    };
    Submitfunc = (e) => {
        e.preventDefault();
        console.log(this.state.numGuest);
        console.log(this.state.checkedB);
        //send the info to evntid,gustid
    }

    componentDidMount() {
        this.props.ChangeToRsvpPage();
        // get the vet, 
    }

    render() {
        // const { match } = this.props
        //              exact path="/beuorguest/rsvp/:vetId/:eventId/:guestId/"

        return (
            <div>
                <h3>vetId Param: {this.props.match.params.vetId}</h3>
                <h3>eventId Param: {this.props.match.params.eventId}</h3>
                <h3>vetId Param: {this.props.match.params.guestId}</h3>

                <Form onSubmit={this.Submitfunc}>

                    <br /><br /><br />
                    שלום לך  name user
                    <br />
                    את מוזמן name of event
                    <br />
                    שיתקיים    when and whre
                    <br />
                    שנמשח לראותך
                    <br /><br />
                    are you caming:   <Checkbox
                        checked={this.state.checkedB}
                        onChange={this.handleChange("checkedB")}
                        value="checkedB"
                        color="primary"
                    />
                    <br /><br />

                    <FormControl>
                        How many will you come?  <InputLabel htmlFor="age-native-simple"></InputLabel>
                        <Select
                            native
                            value={this.state.age}
                            onChange={this.handleChangeGuest('numGuest')}  >
                            <option value="" />
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <br />
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Rsvp;



