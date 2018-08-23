import React, { Component } from 'react';
import '../App.css'
import styled from 'styled-components';
import Guest from './Guest'
import { Droppable } from 'react-beautiful-dnd';

import { observer, inject } from 'mobx-react';



const Container = styled.div`
  height: 100%;
  background-color: white;
  width: 300px;
  margin: 20px;
  padding: 10px;
  overflow: auto;
`;

let myId = 0;

@inject("store")
@observer
class GuestContainer extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
    }
    render() {
        myId++;
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
}

@inject("store")
@observer
class Table extends Component {
   
    render() {
        return (
            <Droppable droppableId={String(this.props.index)}>
                {(provided) => (
                    <GuestContainer provided={provided}  table={this.props.table}/>
                )}
            </Droppable>
        );
    }
}

export default Table;