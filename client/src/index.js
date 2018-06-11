import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import User from './User';
// import {Provider} from 'react-redux'
// import {createStore, applyMiddleware} from 'redux'
// import rootReducer, {DEFAULT_STATE} from './reducers'
// const store = createStore(rootReducer, DEFAULT_STATE)

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //<Provider store={store}>
    <User />
    , document.getElementById('root')
    //</Provider>
);
registerServiceWorker();
