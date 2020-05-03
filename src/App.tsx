import React from 'react';
import './App.scss';
import { AppState } from './store/root'
import { connect } from 'react-redux'
import { updateSignInStatus, setSignInListener, UserSignInStatus } from './store/user';
import SignedIn from './components/SignedIn';
import SignedOut from './components/SignedOut';

type appProps = {
  signInStatus: UserSignInStatus,
  updateSignInStatus: Function,
  setSignInListener: Function,
}

const mapStateToProps = ({ user: { signInStatus } }: AppState) => ({ signInStatus });
const mapDispatchToProps = { updateSignInStatus, setSignInListener }


class App extends React.Component<appProps, {}> {

  componentDidMount() {
    this.props.setSignInListener(this.props.updateSignInStatus)
  }

  render() {
    let content;
    switch (this.props.signInStatus) {
      case UserSignInStatus.UNKNOWN:
        content = 'loading...';
        break;
      case UserSignInStatus.SIGNED_IN:
        content = <SignedIn />;
        break;
      case UserSignInStatus.SIGNED_OUT:
        content = <SignedOut />;
        break;
    }

    return (
      <div className="AppContainer">
        <div className="AppContent">
          <div className="AppTitle">Gcal Vacate</div>
          {content}
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
