import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSignOut } from '../store/user';
import { fetchCalendars } from '../store/calendarList';
import { AppState } from '../store/root';
import CalendarList from './signedin/CalendarList/CalendarList';
import SearchForm from './signedin/SearchForm';

export default () => {
    const dispatch = useDispatch();
    const calendars = useSelector((state: AppState) => state.calendarList.calendarList);
    const selectedCalendarId = useSelector((state: AppState) => state.calendarList.selectedId);

    return (
        <div>
            <button onClick={() => dispatch(requestSignOut())}>Click me to sign out :(</button>
            <button onClick={() => dispatch(fetchCalendars())}>Click me to list calendars</button>
            {calendars.length > 0 && <CalendarList />}
            {selectedCalendarId && <SearchForm />}
        </div>
    )

}
