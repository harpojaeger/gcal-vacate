import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventInstances } from '../../store/events';
import { AppState } from '../../store/root';
import EventsList from './EventsList';

export default () => {
    const dispatch = useDispatch();
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);
    const [startDate, setStartDate] = useState(now);
    const [endDate, setEndDate] = useState(oneWeekFromNow);
    const calendarId: string = useSelector(
        (state: AppState) => state.calendarList.selectedId
    );

    function sendSearchRequest() {
        dispatch(
            fetchEventInstances({
                timeMin: startDate,
                timeMax: endDate,
                calendarId,
            })
        );
    }

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => date && setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
            <button disabled={calendarId === ''} onClick={sendSearchRequest}>
                Do a search
            </button>
            <EventsList />
        </div>
    );
};
