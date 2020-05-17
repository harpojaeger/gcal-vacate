import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/root';
import CalendarList from './signedin/CalendarList/CalendarList';
import SearchForm from './signedin/SearchForm';
import { AsyncOperationStatus } from '../store/enums';

export default () => {
    const calendarListFetchStatus = useSelector(
        (state: AppState) => state.calendarList.fetchStatus
    );
    return (
        <div className="SignedIn">
            <CalendarList />
            {calendarListFetchStatus === AsyncOperationStatus.FULFILLED && (
                <SearchForm />
            )}
        </div>
    );
};
