import React, { Component } from 'react';
import '../App.css'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';

const Container = styled.div`
  height: 30px;
  background-color: blue;
  width: 100%;
`;


@inject("store")
@observer
class Guest extends Component {

    render() {
        return (
            <Draggable draggableId={this.props.guest._id} index={this.props.index}>
                {(provided) => (
                    <div className="guest-container" 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                            {...provided.draggableProps}>
                        <Container
                            
                            
                        >
                            {this.props.guest.name}
                        </Container>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Guest;