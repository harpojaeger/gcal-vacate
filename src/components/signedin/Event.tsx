import React from 'react';
import { useDispatch } from 'react-redux';
import { EventWithSelectableInstances, setInstanceSelected, setAllEventInstancesSelected } from '../../store/events';
import EventInstance from './EventInstance';

export default ({ event, eventIndex }: { event: EventWithSelectableInstances, eventIndex: number }) => {
    const dispatch = useDispatch();

    function handleInstanceSelection(eventIndex: number, instanceIndex: number, eventId: string, instanceId: string, selected: boolean) {
        dispatch(setInstanceSelected({ eventIndex, instanceIndex, eventId, instanceId, selected }));
    }
    function handleEventSelection(eventIndex: number, eventId: string, selected: boolean) {
        dispatch(setAllEventInstancesSelected({ eventIndex, eventId, selected }));
    }
    const instances = event.instances;
    let allInstancesSelected = true;
    let noInstancesSelected = true;
    let indeterminate: boolean;
    for (let instance of instances) {
        allInstancesSelected = allInstancesSelected && instance.selected;
        noInstancesSelected = noInstancesSelected && !instance.selected;
        indeterminate = !(allInstancesSelected || noInstancesSelected)
        if (indeterminate) break;
    }
    return (
        <div key={event.eventId}>
            <input type="checkbox"
                id={event.eventId}
                checked={allInstancesSelected}
                onChange={() => handleEventSelection(eventIndex, event.eventId, !allInstancesSelected)}
                // Set the checkbox in the visually indeterminate state if only
                // some of this event's instances are selected.
                ref={el => el && (el.indeterminate = indeterminate)}
            ></input>
            <label htmlFor={event.eventId}>
                name: {event.summary}, all selected: {allInstancesSelected ? 'yup' : 'nope'}
            </label>
            <br />
                instances:
            <ul>
                {instances.map((instance, instanceIndex) => <EventInstance
                    key={instance.id}
                    instance={instance}
                    handleChange={isSelected => handleInstanceSelection(eventIndex, instanceIndex, event.eventId, instance.id || '', isSelected)} />)}
            </ul>
        </div>
    );
};
