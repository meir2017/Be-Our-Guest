import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'


const Container = styled.div `
    margin: 8px;
    background-color: white;
    width: auto;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}
`;

const Wrapper = styled.div`
    border: 1px solid lightgrey;
    border-radius: 5px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    width: 220px;
    opacity: 1;
`;


class Guest extends Component {

    render() {
        return (
            <Draggable draggableId={this.props.guest.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <Wrapper>
                            <div className="guest">
                                <button
                                    type="button"
                                    className="btn-cus btn-sm btn"
                                    onClick={()=> this.props.deleteGuest(this.props.guestId, this.props.tableId)}
                                >
                                    X
                                </button>
                                <div className="guest-info">
                                    <p className="guest-name"><em><b>{this.props.guest.name}</b></em></p>
                                    <p>Category: {this.props.guest.category}</p>
                                    <p><b>+ </b>{this.props.guest.confirmed} confirmed (+ {this.props.guest.confirmed})</p>
                                </div>
                            </div>
                        </Wrapper>
                    </Container>
                )}
            </Draggable>
        );
    }
}

export default Guest;