import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSignOut } from '../store/user';
import { fetchCalendars } from '../store/calendarList';
import { AppState } from '../store/root';
import CalendarList from './signedin/CalendarList/CalendarList';
import SearchForm from './signedin/SearchForm';
import { Button } from './elements/Button';

export default () => {
    const dispatch = useDispatch();
    const calendars = useSelector((state: AppState) => state.calendarList.calendarList);
    const selectedCalendarId = useSelector((state: AppState) => state.calendarList.selectedId);

    return (
        <div className="SignedIn">
            <Button onClick={() => dispatch(requestSignOut())} label="Click me to sign out :(" />
            <Button onClick={() => dispatch(fetchCalendars())} label="Click me to list calendars" />
            {calendars.length > 0 && <CalendarList />}
            {selectedCalendarId && <SearchForm />}
        </div>
    )

}
