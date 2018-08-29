import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css'
//import styled from 'styled-components';
import Guest from './Guest'
import { Droppable } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import {
    withStyles,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';




const styles = theme => ({
    paper: {

    },
    tableWrapper: {
        margin: 8,
        width: 250,
        height: 500,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'blue',
        // transition: width 2s, height 4s;
        // transition: background-color 0.2s ease;
        //backgroundColor: ${ props => (props.isDraggingOver ? '#4A6572' : '#4A6572') }
        fontFamily: 'Roboto Slab, serif',
        position: 'relative',
        // justifyContent: '',
        border: '3 solid lightgrey',
        borderRadius: 2,
    }

});

/* const Container = styled.div`
margin: 8px;
width: 250px;
height: 500px;
flex: 1;
display: flex;
flex-direction: column;
// transition: width 2s, height 4s;
// transition: background-color 0.2s ease;

//background-color: ${props => (props.isDraggingOver ? '#4A6572' : '#4A6572')}
background-color: blue,
font-family: 'Roboto Slab', serif;
position: relative;
justifyContent: 'center';
border: 3px solid lightgrey;
border-radius: 2px;
`;

 */
/* @inject("store")
@observer
class GuestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (<Grid item xs={12}
            innerRef={this.props.provided.innerRef}
            {...this.props.provided.droppableProps}
        >
            <Paper className={classes.paper}>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={this.props.table.title}/>
                </ListItem>
                {this.props.table.guests.map((guest, index) => (
                    <Guest table={this.props.table} index={index} key={guest._id} guest={guest} />
                ))}
                {this.props.provided.placeholder}
            </Paper>
        </Grid>);
    } */
/*     render() {
        return (<Container
            innerRef={this.props.provided.innerRef}
            {...this.props.provided.droppableProps}
           >
            {this.props.table.guests.map((guest, index) => (
                <Guest table={this.props.table} index={index} key={guest._id} guest={guest} />
            ))}
            {this.props.provided.placeholder}
        </Container>);
    }
 }*/

@inject("store")
@observer
class Table extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Droppable droppableId={String(this.props.index)}>
                {(provided) => (
                    // <GuestContainer provided={provided}  table={this.props.table}/>
                    <div

                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <Paper className={classes.tableWrapper}>
                            <Paper className={classes.paper}>
                                <List>
                                    <ListItem className={classes.listItem} >
                                        <ListItemText primary={this.props.table.title} />
                                    </ListItem>
                                    {/* {console.log(JSON.stringify(this.props.table.guests))} */}
                                </List>

                            </Paper>
                            {this.props.table.guests.map((guest, index) => (
                                <Guest table={this.props.table} index={index} key={guest._id} guest={guest} />

                            ))}
                            {provided.placeholder}

                        </Paper>

                    </div>


                )}
            </Droppable>
        );
    }
}

Table.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Table);