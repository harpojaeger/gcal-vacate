import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/root';
import { setSelectedId } from '../../../store/calendarList';
import { AsyncOperationStatus } from '../../../store/enums';

export default () => {
    const calendarListFetchStatus = useSelector(
        (state: AppState) => state.calendarList.fetchStatus
    );
    const calendars = useSelector(
        (state: AppState) => state.calendarList.calendarList
    );
    const selectedId = useSelector(
        (state: AppState) => state.calendarList.selectedId
    );
    const dispatch = useDispatch();

    let content;
    switch (calendarListFetchStatus) {
        case AsyncOperationStatus.FULFILLED:
            content = (
                <select value={selectedId} onChange={handleChange}>
                    <option value="">Select a calendar...</option>
                    {calendars.map(calendar)}
                </select>
            );
            break;
        case AsyncOperationStatus.PENDING:
            content = 'loading calendar list...';
            break;
        default:
            content = "Couldn't load calendar list.";
    }

    return <div>{content}</div>;

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setSelectedId(e.target.value));
    }

    function calendar({ id, summary }: gapi.client.calendar.CalendarListEntry) {
        return (
            <option key={id} value={id}>
                {summary}
            </option>
        );
    }
};
