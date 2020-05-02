import React from 'react';
import { useDispatch } from 'react-redux';
import { requestSignIn } from '../store/user';
import './SignedOut.css';

export default () => {
    const dispatch = useDispatch();

    return (
        <div className="SignedOutContainer">
            <div className="Description">
                Gcal Vacate helps you quickly and conveniently delete repeating events from your Google Calendar within a specified set of dates.
            </div>
            <div className="Instructions">
                To use Gcal Vacate, log in with your Google account. If you haven't used Gcal Vacate before, you will be prompted to grant it access to view and modify your Google Calendar data.
                Gcal Vacate doesn't store your login, password or any of your personal information. You can revoke Gcal Vacate's access to your account at any time <a href="https://support.google.com/accounts/answer/3466521?hl=en">(more info</a>).
            </div>
            <button className="LogIn" onClick={() => dispatch(requestSignIn())}>Log in</button>
        </div>
    );
}
