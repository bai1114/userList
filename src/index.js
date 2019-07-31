import React from 'react';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
//import { BrowserRouter, Route } from 'react-router-dom';

render (
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
