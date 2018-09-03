import React, { Component } from 'react';
import '../App.css'
//import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import {
    Grid,
    Paper,
    Chip,
    Avatar,
    IconButton
} from '@material-ui/core';



const styles = theme => ({
    guestWrapper: {
       // zIndex: 10,
    },
    paper: {
        height: 140,
        width: 100,
    },

    categoryAvatar: {
        height: 10,
        width: 10,
        marginTop: 5
    },
    iconButton: {
        height: 20,
        width: 20
    },
    icon: {
        height: 15,
        width: 15,

    },

});
/* 
const Container = styled.div`
  height: 30px;
  background-color: blue;
  width: 100%;
`;

 */
@inject("store")
@observer
class Guest extends Component {

    render() {
        const { classes, guest } = this.props;
        console.log(this.props.store.user.catagories);
        return (
            <Draggable draggableId={this.props.guest._id} index={this.props.index}>
                {(provided) => (
                    <div className={classes.guestWrapper}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <Grid container spacing={0} style={{ paddingBottom: 5 }}>
                            <Grid item xs={12}>
                                <Paper>
                                    <Grid container spacing={0} style={{ padding: 10 }}>
                                        <Grid item xs={1}>
                                            {this.props.guest.categories.map((category, index) => (
                                                <Avatar key={this.props.store.user.categories[category]._id} className={classes.categoryAvatar}
                                                    style={{ backgroundColor: this.props.store.user.categories[category].colorCode }} />
                                            ))}


                                        </Grid>
                                        <Grid item xs={10}>
                                            <Chip
                                                avatar={<Avatar>{guest.numConfirmed}/{guest.numInvited - guest.numNotComing}</Avatar>}
                                                label={guest.name}
                                                className={classes.chip}
                                            />
                                        </Grid>

                                        <Grid item xs={1}>
                                            <IconButton aria-label="Delete" className={classes.iconButton} onClick={(e)=>{this.props.handleOnClick(this.props.index)}} >
                                                <ClearIcon className={classes.icon} />
                                            </IconButton>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>

                    </div>
                )}
            </Draggable>
        );
    }
}

export default withStyles(styles)(Guest);