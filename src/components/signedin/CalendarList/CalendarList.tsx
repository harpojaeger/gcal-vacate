import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/root'
import { setSelectedId } from '../../../store/calendarList'

export default () => {
    const calendars = useSelector((state: AppState) => state.calendarList.calendarList);
    const selectedId = useSelector((state: AppState) => state.calendarList.selectedId);
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setSelectedId(e.target.value));
    }

    function calendar({ id, summary }: gapi.client.calendar.CalendarListEntry) {
        return (
            <option key={id} value={id}>
                {summary}
            </option>
        )
    }

    return (
        <div>
            <select value={selectedId} onChange={handleChange}>
                <option value=''>
                    Select a calendar...
                    </option>
                {calendars.map(calendar)}
            </select>
        </div>
    )
}
