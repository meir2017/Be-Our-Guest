

import React, { Component } from 'react';
import axios from 'axios';

class Meir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            divText: ""
        }
    }
    onChangeText = (e) => {
        this.setState({ inputText: e.target.value });
    }
    onClickBtn = (e) => {
        e.preventDefault();
        axios.get(`/meir/${this.state.inputText}`)
            .then(response => {
                this.setState({ divText: response.data });
                this.setState({ inputText: "" });
            })
            .catch(err => console.log('Error: cannot fetch data please check the input', err));
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.onChangeText} value={this.inputText} />
                <br />
                <input type="button" onClick={this.onClickBtn} value="Click" />
                <br /><br /><br />
                {this.state.divText}
            </div>
        );
    }
}

export default Meir;