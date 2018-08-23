import React, { Component } from 'react';

export class GuestsList extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <div className="container">
                <div className="list-of-guests">
                {/* displaying the guests[] */}
                {/* from here the user drag and drop the guests into TableList compoment */}
                </div>
                <button>Edit list</button>
            </div>
        );
    }
}

export default GuestsList;