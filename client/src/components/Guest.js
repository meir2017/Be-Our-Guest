import React, { Component } from 'react';
import '../App.css'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    paper: {
        height: 140,
        width: 100,
    }

});

const Container = styled.div`
  height: 30px;
  background-color: blue;
  width: 100%;
`;


@inject("store")
@observer
class Guest extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Draggable draggableId={this.props.guest._id} index={this.props.index}>
                {(provided) => (
                    <div className="guest-container"
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <Grid item xs={12} >
                            <Paper>
                                {this.props.guest.name}
                            </Paper>
                        </Grid>

                    </div>
                )}
            </Draggable>
        );
    }
}

export default withStyles(styles)(Guest);