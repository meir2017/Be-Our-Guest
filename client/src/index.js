"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css'; //reactstrap

import store from './store/BeOurGuestStore';


import { Provider } from 'mobx-react';
console.log(store)
// window.store = store;
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
