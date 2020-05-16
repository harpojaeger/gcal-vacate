import React from 'react';
import './App.scss';
import { AppState } from './store/root';
import { connect } from 'react-redux';
import {
    updateSignInStatus,
    setSignInListener,
    UserSignInStatus,
    requestSignOut,
} from './store/user';
import SignedIn from './components/SignedIn';
import SignedOut from './components/SignedOut';
import { Button } from './components/elements/Button';

type appProps = {
    signInStatus: UserSignInStatus;
    updateSignInStatus: Function;
    setSignInListener: Function;
    requestSignOut: Function;
};

const mapStateToProps = ({ user: { signInStatus } }: AppState) => ({
    signInStatus,
});
const mapDispatchToProps = {
    updateSignInStatus,
    setSignInListener,
    requestSignOut,
};

class App extends React.Component<appProps, {}> {
    componentDidMount() {
        this.props.setSignInListener(this.props.updateSignInStatus);
    }

    render() {
        let headerRightContent;
        let content;
        switch (this.props.signInStatus) {
            case UserSignInStatus.UNKNOWN:
                content = 'loading...';
                break;
            case UserSignInStatus.SIGNED_IN:
                content = <SignedIn />;
                headerRightContent = (
                    <div className="SignOutButton">
                        <Button
                            onClick={this.props.requestSignOut}
                            label="Log out"
                        />
                    </div>
                );
                break;
            case UserSignInStatus.SIGNED_OUT:
                content = <SignedOut />;
                break;
        }

        return (
            <div className="AppContainer">
                <div className="AppContent">
                    <div className="Header">
                        <div className="AppTitle">Gcal Vacate</div>
                        {headerRightContent}
                    </div>
                    {content}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
