import React from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarList from './components/CalendarList/CalendarList';
import { AppState } from './store/root'
import { connect } from 'react-redux'
import { fetchCalendars } from './store/calendarList';
import { requestSignIn, requestSignOut, updateSignInStatus, setSignInListener } from './store/user';

type appProps = {
  isSignedIn: boolean,
  updateSignInStatus: Function,
  setSignInListener: Function,
  calendars: gapi.client.calendar.CalendarListEntry[]
  fetchCalendars: Function,
  signIn: Function,
  signOut: Function,
}

const mapStateToProps = (state: AppState) => ({ isSignedIn: state.user.isSignedIn, calendars: state.calendarList.calendarList });
const mapDispatchToProps = { fetchCalendars, signIn: requestSignIn, signOut: requestSignOut, updateSignInStatus, setSignInListener }


class App extends React.Component<appProps, {}> {

  constructor(props: appProps) {
    super(props);
    this.listCalendars = this.listCalendars.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    this.props.signIn();
  }

  signOut() {
    this.props.signOut();
  }

  listCalendars() {
    this.props.fetchCalendars();
  }

  componentWillMount() {
    this.props.setSignInListener(this.props.updateSignInStatus)
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
