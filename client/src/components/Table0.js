import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css'
//import styled from 'styled-components';
import 'typeface-roboto'
import Guest from './Guest'
import { Droppable } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {
    withStyles,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    Avatar,

} from '@material-ui/core';




const styles = theme => ({
    paper: {

    },
    tableWrapper: {
        margin: 8,
        width: 280,
        height: 500,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'darkgrey',
        // transition: width 2s, height 4s;
        // transition: background-color 0.2s ease;
        //backgroundColor: ${ props => (props.isDraggingOver ? '#4A6572' : '#4A6572') }
        // backgroundColor: 
        fontFamily: 'Roboto Slab, serif',
        position: 'relative',
        // justifyContent: '', 
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
       /*  position: 'fixed',
        zIndex:2, */
        overflow:'hidden',




    },

    tableHeader: {
        padding: 5,
        color: 'white',
        backgroundColor: 'black'

    },

    tableAvatar: {
        height: 60,
        width: 60,
        color: 'black',
        marginBottom: 5,

        fontSize: 18

    },

    iconButton: {
        height: 35,
        width: 35,


    },
    icon: {
        height: 20,
        width: 20,

    },

    whiteTypography: {
        color: 'white',
    },

    guestListWrapper: {
        paddingTop:5,
        overflowY: 'scroll',
    }


});





@inject("store")
@observer
class Table0 extends Component {

    render() {
        const { classes } = this.props;
        let store = this.props.store;
        let currentEvent = store.user.events[store.eventIndex];
        return (

            <Droppable droppableId={String(this.props.index)}>
                {(provided) => (
                    <div style={{ height: '100%' }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>

                        <Paper className={classes.tableWrapper} >
                            <Paper className={classes.tableHeader} >
                                <Grid container spacing={0}>
                                    <Grid item xs={12} align="right" spacing={0}>
                                        <IconButton aria-label="Edit" className={classes.iconButton} >
                                            <EditIcon className={classes.icon} />
                                        </IconButton>

                                    </Grid>
                                    <Grid item xs={12} align="center">
    
                                        <Typography variant="title" gutterBottom align="center" className={classes.whiteTypography}>
                                            Unseated Guests
                                        </Typography>
                                        <Avatar className={classes.tableAvatar}>
                                         {currentEvent.guests.length} / {currentEvent.guests.length}
                                        </Avatar>
                                    </Grid>
                                </Grid>


                            </Paper>
                            <div className={classes.guestListWrapper}>
                                {currentEvent.guests.map((guest, index) => (
                                    <Guest index={index} key={guest._id} guest={guest} />
                                ))}
                            </div>

                            {provided.placeholder}
                        </Paper>
                    </div>
                )}
            </Droppable>



        );
    }
}

Table0.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Table0);
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
