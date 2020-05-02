import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventInstances, SelectableEventInstance, EventWithSelectableInstances, setInstanceSelected } from '../../store/events';
import { AppState } from '../../store/root';

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
    function handleInstanceSelection(eventIndex: number, instanceIndex: number, eventId: string, instanceId: string, selected: boolean) {
        dispatch(setInstanceSelected({ eventIndex, instanceIndex, eventId, instanceId, selected }))
    }

    function placeholderEventOutputter(event: EventWithSelectableInstances, eventIndex: number) {

        return (
            <div>
                name: {event.summary}
                <br />
                instances:
                <ul>
                    {event.instances.map(eventInstance)}
                </ul>
            </div>
        )
        function eventInstance(instance: SelectableEventInstance, instanceIndex: number) {
            const isAllDayEvent: boolean = instance.start?.dateTime === undefined;
            let formattedStartTime: string = '';
            let formattedEndTime: string = '';
            // This still needs some adjustment, as it shows one-day all-day events
            // as lasting from the day they are on until the next day. Workable for now.
            if (isAllDayEvent) {
                if (instance.start?.date) {
                    formattedStartTime = new Date(Date.parse(instance.start.date)).toLocaleDateString();
                }
                if (instance.end?.date) {
                    formattedEndTime = new Date(Date.parse(instance.end.date)).toLocaleDateString();
                }
            } else {
                if (instance.start?.dateTime) {
                    formattedStartTime = new Date(Date.parse(instance.start.dateTime)).toLocaleString();
                }
                if (instance.end?.dateTime) {
                    formattedEndTime = new Date(Date.parse(instance.end.dateTime)).toLocaleString();
                }
            }


            return (
                <li key={instance.id}>
                    <input type="checkbox" checked={instance.selected} onChange={
                        () => handleInstanceSelection(eventIndex, instanceIndex, event.eventId, instance.id || '', !instance.selected)
                    }></input>
                from {formattedStartTime} to {formattedEndTime}. selected: {instance.selected ? 'yup' : 'nope'}
                </li>
            )
        }
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
