import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { storeFactory } from './store/root';
import { GapiClient } from './client/gapi';

const API_KEY = 'AIzaSyDFnRYazEQRQ-IQuUyzWJDyw_gdEp9Zw4w';
const CLIENT_ID = '223934007308-shigrvi2vqe0rsgbtc3r0636ma19eqrt.apps.googleusercontent.com';
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

const client = new GapiClient({
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  scope: SCOPES,
  discoveryDocs: DISCOVERY_DOCS
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeFactory(client)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
