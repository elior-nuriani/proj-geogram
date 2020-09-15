import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/global.scss'

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import MainSpinner from './components/MainSpinner';
import ScrollToTop from './components/ScrollToTop';


import { HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<MainSpinner />} persistor={persistor}>
        <Router history={history} basename='/'>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
