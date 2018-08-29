
import React, { Component } from 'react';

//// test  Awesomplete
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labal: null,
            datalist: ["node.js", "Java", "JavaScript", "c", "c++", "html", "Component", "react"]
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ labal: e.target.value })
        console.log(e.target.value)

    }

    render() {

        return (
            <div>

                <input className="awesomplete" onSelect={this.handleChange} list="mylist" />
                <datalist id="mylist" >
                    {this.state.datalist.map((item, index) => {
                        return <option key={index + item}>{item} </option>
                    })}
                </datalist>


            </div>
        );
    }
}

export default Test;