import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button } from 'reactstrap';


import InvitationManager from './InvitationManager';
import EasyPlace from './EasyPlace';
import CategoryManager from './CategoryManager';
import TableManager from './TableManager';
import GuestManager from './GuestManager';
import RSVP from './RSVP';

export class EventManager extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Easy Place</Tab>
                    <Tab>Category Manager</Tab>
                    <Tab>Guest Manager</Tab>
                    <Tab>Table Manager</Tab>
                    <Tab>Invitation Manager</Tab>
                </TabList>
                
                <TabPanel>
                    <EasyPlace />
                </TabPanel>
                <TabPanel>
                    <CategoryManager />
                </TabPanel>
                <TabPanel>
                     <GuestManager />
                </TabPanel>
                <TabPanel>
                     <TableManager />
                </TabPanel>
                <TabPanel>
                    <InvitationManager />
                </TabPanel>
            </Tabs>
        );
    }
}

export default EventManager;