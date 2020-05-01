import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventInstances } from '../../store/events';
import { AppState } from '../../store/root';
import { EventWithInstances } from '../../client/gapi';

export default () => {
    const dispatch = useDispatch();
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);
    const [startDate, setStartDate] = useState(now);
    const [endDate, setEndDate] = useState(oneWeekFromNow);
    const calendarId: string = useSelector((state: AppState) => state.calendarList.selectedId);
    const events = useSelector((state: AppState) => state.events.events);

    function sendSearchRequest() {
        dispatch(fetchEventInstances({ timeMin: startDate, timeMax: endDate, calendarId }));
    }

    function placeholderEventOutputter(event: EventWithInstances) {
        return (
            <div>
                id: {event.eventId}
                name: {event.description}
                <br />
                instances:
                <ul>
                    {event.instances.map(eventInstance)}
                </ul>
            </div>
        )
    }

    function eventInstance(event: gapi.client.calendar.Event) {
        return (
            <li key={event.id}>
                from {event.start?.dateTime} to {event.end?.dateTime}
            </li>
        )
    }

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={date => date && setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <DatePicker
                selected={endDate}
                onChange={date => date && setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
            <button onClick={sendSearchRequest}>Do a search</button>

            <div>Events are: {events.map(placeholderEventOutputter)}</div>
        </div>
    )
}
