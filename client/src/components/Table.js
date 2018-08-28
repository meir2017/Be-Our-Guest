import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSize: '',
            category: "",
            tableName: '',
            listOfGuests: "",
            anchorEl: null,
            datalist: ["node.js", "Java", "JavaScript", "c", "c++", "html", "Component", "react"]

        }
    }


    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };
    onChangeText = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });

    }
    saveTable = (e) => {
        console.log("tableName  " + this.state.tableName + "    category " + this.state.category
            + "  tableSize " + this.state.tableSize + "   color " + this.state.color);
        this.handleClose();

        // let infoTable = {
        //     title: this.state.tableName,
        //     number: Number,
        //     maxGuests: this.state.tableSize,
        //     categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
        //     guests: []

        // }

        // axios.post('/beOurGuest/addTable', infoTable)
        //     .then(response => {
        //         if (response.data !== "") {
        //             console.log("save table  " + JSON.stringify(response.data))
        //         } else {
        //             console.log("no user Account ")
        //         }
        //     }).catch(function (error) { console.log(error); });
        // this.setState({ inputText: "", passText: "" });


        // if the Categorie is new i need to save thue
        // send  to save in store and  db


    }


    displayTable = () => {
        //display the added table in new div
    }

    deleteTable = () => {
        //the function delete table from tables[]
    }

    editTable = () => {
        //the function open table-details div
    }

    render() {
        // const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className="container">
                <div className="table-details">
                    <Button variant="fab" style={{ float: "left", backgroundColor: "#00b0ff", zIndex: "-10px" }}
                        aria-label="Add"
                        aria-owns={open ? 'simple-popper' : null}
                        aria-haspopup="false"
                        onClick={this.handleClick}
                    >
                        <AddIcon />
                    </Button>

                    <Popover
                        id="simple-popper"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Typography style={{ padding: "20px" }}>
                            <input name="tableName" onChange={this.onChangeText} value={this.state.tableName} placeholder=" Table Name" type="text" /><br /><br />
                            <input name="tableSize" onChange={this.onChangeText} value={this.state.tableSize} placeholder="size" type="number" /><br /><br />
                            <span >Color Table:  </span> <input style={{ marginLeft: "30px" }} type="color" name="color" onChange={this.onChangeText} id="" /><br /><br />
                            <input className="awesomplete" name="category" placeholder="category" onSelect={this.onChangeText} list="mylist" /><br /> <br />
                            <datalist id="mylist" >

                                {/* list of category */}
                                {this.state.datalist.map((item, index) => {
                                    return <option key={index + item}>{item} </option>
                                })}
                            </datalist>
                            {/* <input name="" onChange={} value={this.state.} placeholder="List of guest" type="text" /> <br /><br /> */}

                            <Button onClick={this.saveTable} variant="contained" size="medium" color="secondary">Save</Button>
                        </Typography>
                    </Popover>
                </div>


                {/* <div className="table-buttons">   
                        <button onClick={this.editTable}>Edit Table</button>
                        <button onClick={this.deleteTable}>Delete Table</button>
                    </div> */}
            </div>
        );
    }
}

export default Table;