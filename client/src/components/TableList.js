import React, { Component } from 'react';
import '../App.css'
//import styled from 'styled-components'
import Table from './Table';
import Table0 from './Table0';
import AddTableModal from './AddTableModal'
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import { 
    withStyles,
    Grid
} from '@material-ui/core';



const styles = theme => ({
    tableListWrapper: {
        width: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'nowrap',
        overflow: 'auto',
    }

});

/* 
const Container = styled.div`
display: flex;
flex-direction: column;
width: auto;
transition: width 2s, height 4s;
flex: 1;
justify-content:space-around;
`; */

@inject("store")
@observer
class TableList extends Component {
    constructor(props) {
        super(props);
        this.props.store.populateEvent();
    }


    render() {
        let currentEvent = this.props.store.user.events[this.props.store.eventIndex];
        const { classes } = this.props;
        /* let table0 = { _id: "0", category:this.props.store.user.categories[0], title:this.props.store.user.categories[0].name, 
        guests:[{ name: "Shlomo Steinitz", _id: "44", categories:[1,2] },
         { name: "Akiva Stern", _id: "45" ,categories:[0] },
         { name: "Akiva Stern", _id: "46" ,categories:[0] },
         { name: "Akiva Stern", _id: "47" ,categories:[0] },{ name: "Akiva Stern", _id: "30" ,categories:[0] }
        ,{ name: "Akiva Stern", _id: "48" ,categories:[0] }, { name: "Akiva Stern", _id: "31" ,categories:[0] }, 
        { name: "Akiva Stern", _id: "49" ,categories:[0] } ] } */
        return (
            <div className={classes.tableListWrapper}>
              <AddTableModal></AddTableModal>
            <Table0  index={-1}/>
          
                {currentEvent.tables.map((table, index) => (
                    <Table table={table} index={index} key={table._id} />
                ))}
            </div>

        );
    }
}

export default  withStyles(styles)(TableList);