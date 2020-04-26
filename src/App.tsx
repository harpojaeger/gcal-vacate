import React from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarList from './components/CalendarList/CalendarList';
import { AppState } from './store/reducer'
import { setSignedIn, setCalendars } from './store/user/actions';
import { connect } from 'react-redux'
import { GapiClient, RpcClient } from './client/gapi'
const API_KEY = 'AIzaSyDFnRYazEQRQ-IQuUyzWJDyw_gdEp9Zw4w';
const CLIENT_ID = '223934007308-shigrvi2vqe0rsgbtc3r0636ma19eqrt.apps.googleusercontent.com';
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

type appProps = {
  isSignedIn: boolean,
  setSignedIn: Function,
  calendars: gapi.client.calendar.CalendarListEntry[]
  setCalendars: Function,
}

const mapStateToProps = (state: AppState) => ({ isSignedIn: state.user.isSignedIn, calendars: state.user.calendars });
const mapDispatchToProps = { setSignedIn, setCalendars }


class App extends React.Component<appProps, {}> {

  rpcClient: RpcClient;

  constructor(props: appProps) {
    super(props);
    this.updateSignInStatus = this.updateSignInStatus.bind(this);
    this.listCalendars = this.listCalendars.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.rpcClient = new GapiClient({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: DISCOVERY_DOCS
    });
    this.rpcClient.setSigninListener(this.updateSignInStatus);
  }


  updateSignInStatus(isSignedIn: boolean): void {
    this.props.setSignedIn(isSignedIn);
  }

  signIn() {
    this.rpcClient.signIn();
  }

  signOut() {
    this.rpcClient.signOut();
    this.props.setCalendars([]);
  }

  listCalendars() {
    this.rpcClient.listCalendars({ minAccessRole: 'writer' })
      .then(result => {
        this.props.setCalendars(result);
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {this.props.isSignedIn ?
              <button onClick={this.signOut}>Click me to sign out :(</button> :
              <button onClick={this.signIn}>Click me to launch a rad signin workflow</button>
            }
            {this.props.isSignedIn && <button onClick={this.listCalendars}>Click me to list calendars</button>}
            {this.props.calendars.length > 0 && this.props.isSignedIn &&
              <CalendarList calendars={this.props.calendars} />
            }
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
