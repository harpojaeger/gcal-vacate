import React from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarList from './CalendarList';

const API_KEY = 'AIzaSyDFnRYazEQRQ-IQuUyzWJDyw_gdEp9Zw4w';
const CLIENT_ID = '223934007308-shigrvi2vqe0rsgbtc3r0636ma19eqrt.apps.googleusercontent.com';
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

type appState = {
  isSignedIn: boolean,
  calendars?: gapi.client.calendar.CalendarListEntry[];
}

class App extends React.Component<{}, appState> {
  constructor(props: {}) {
    super(props);
    this.updateSignInStatus = this.updateSignInStatus.bind(this);
    this.initClient = this.initClient.bind(this);
    this.listCalendars = this.listCalendars.bind(this);
    this.state = { isSignedIn: false };
  }

  loadCalendarApi(): void {
    gapi.load('client:auth2', this.initClient);


  }

  initClient(): void {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: DISCOVERY_DOCS,
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
      this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  // This will ultimately need to set component state
  updateSignInStatus(isSignedIn: boolean) {
    this.setState(() => ({ isSignedIn }));
  }

  signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  componentDidMount() {
    this.loadCalendarApi();
  }

  listCalendars() {
    gapi.client.calendar.calendarList.list({ minAccessRole: 'writer' }).then(result => {
      this.setState(() => {
        if (result?.result?.items?.length === 0) return {};

        return { calendars: result.result.items };
      });

    }).catch(console.error);

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.


          </p>
          <div>
            {this.state.isSignedIn ?
              <button onClick={this.signOut}>Click me to sign out :(</button> :
              <button onClick={this.signIn}>Click me to launch a rad signin workflow</button>
            }
            {this.state.isSignedIn && <button onClick={this.listCalendars}>Click me to list calendars</button>}
            {this.state.calendars && this.state.isSignedIn &&
              <CalendarList calendars={this.state.calendars} />
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

export default App;
