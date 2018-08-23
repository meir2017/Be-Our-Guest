import React, { Component } from 'react';
import '../App.css'
import styled from 'styled-components'
import Table from './Table';
import PerfectScrollbar from 'perfect-scrollbar';
import { DragDropContext } from 'react-beautiful-dnd';

import {observer, inject} from 'mobx-react';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 500px;
    width: 100%;
    background-color: grey;
    position: relative;
    overflow: hidden;
`;

 @inject("store")
@observer
class TableList extends Component {
    constructor(props){
        super(props);
        this.props.store.populateEvent();
    }
  

    render() {
       let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
        return (
            
           
                <Container>
                { currentEvent.tables.map((table, index) =>( 
                    <Table table={table} index={index} key={table._id}/> 
                   ))}
                </Container>
           
        );
    }
}

export default TableList;