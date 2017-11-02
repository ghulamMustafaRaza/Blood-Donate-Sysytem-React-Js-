import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import RTEP from 'react-tap-event-plugin';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { initializeApp } from 'firebase'
import { Provider } from 'react-redux'
import store from './store'
import { DonorActions } from './store/actions' 
var config = {
  apiKey: "AIzaSyD0bFCG6AYvsLYwgWpcChT-GsVZD7PlhWM",
  authDomain: "college-system.firebaseapp.com",
  databaseURL: "https://college-system.firebaseio.com",
  projectId: "college-system",
  storageBucket: "college-system.appspot.com",
  messagingSenderId: "731872611024"
};

initializeApp(config);

store.dispatch(DonorActions.loadDonors())

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
RTEP()
registerServiceWorker();
