import React from 'react';
import './App.css';
import { AppState } from './store/root'
import { connect } from 'react-redux'
import { updateSignInStatus, setSignInListener } from './store/user';
import SignedIn from './components/SignedIn';
import SignedOut from './components/SignedOut';

type appProps = {
  isSignedIn: boolean,
  updateSignInStatus: Function,
  setSignInListener: Function,
}

const mapStateToProps = ({ user: { isSignedIn } }: AppState) => ({ isSignedIn });
const mapDispatchToProps = { updateSignInStatus, setSignInListener }


class App extends React.Component<appProps, {}> {

  componentDidMount() {
    this.props.setSignInListener(this.props.updateSignInStatus)
  }

  render() {
    return (
      <div className="AppContainer">
        <div className="AppContent">
          <div className="AppTitle">Gcal Vacate</div>
          {this.props.isSignedIn ? <SignedIn /> : <SignedOut />}
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
