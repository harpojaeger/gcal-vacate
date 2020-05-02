import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/root';
import { EventWithSelectableInstances, SelectableEventInstance, setInstanceSelected } from '../../store/events';
import { AsyncOperationStatus } from '../../store/enums';


export default () => {
    const events = useSelector((state: AppState) => state.events.events);
    const searchStatus = useSelector((state: AppState) => state.events.searchStatus);
    let content;
    switch (searchStatus) {
        case AsyncOperationStatus.FULFILLED:
            content = events.length > 0 ? events.map(Event) : "No events found";
            break;
        case AsyncOperationStatus.PENDING:
            content = "Searching...";
            break;
        case AsyncOperationStatus.REJECTED:
            content = "Error while searching for events."
            break;
        default:
            content = "";
    }
    return (
        <div>{content}</div>
    );
}
type BooleanFunction = (isSelected: boolean) => void;

const Event = (event: EventWithSelectableInstances, eventIndex: number) => {
    const dispatch = useDispatch();

    function handleInstanceSelection(eventIndex: number, instanceIndex: number, eventId: string, instanceId: string, selected: boolean) {
        dispatch(setInstanceSelected({ eventIndex, instanceIndex, eventId, instanceId, selected }))
    }

    return (
        <div key={event.eventId}>
            name: {event.summary}
            <br />
                instances:
            <ul>
                {event.instances.map(
                    (instance, instanceIndex) =>
                        eventInstance(instance, isSelected => handleInstanceSelection(eventIndex, instanceIndex, event.eventId, instance.id || '', isSelected)))}
            </ul>
        </div>
    )

}

function eventInstance(instance: SelectableEventInstance, handleChange: BooleanFunction) {
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
                () => handleChange(!instance.selected)
            }></input>
                from {formattedStartTime} to {formattedEndTime}. selected: {instance.selected ? 'yup' : 'nope'}
        </li>
    )
}
