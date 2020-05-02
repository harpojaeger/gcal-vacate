import React from 'react';
import { useDispatch } from 'react-redux';
import { EventWithSelectableInstances, setInstanceSelected } from '../../store/events';
import EventInstance from './EventInstance';

export default ({ event, eventIndex }: { event: EventWithSelectableInstances, eventIndex: number }) => {
    const dispatch = useDispatch();

    function handleInstanceSelection(eventIndex: number, instanceIndex: number, eventId: string, instanceId: string, selected: boolean) {
        dispatch(setInstanceSelected({ eventIndex, instanceIndex, eventId, instanceId, selected }));
    }
    return (
        <div key={event.eventId}>
            name: {event.summary}
            <br />
                instances:
            <ul>
                {event.instances.map((instance, instanceIndex) => <EventInstance
                    key={instance.id}
                    instance={instance}
                    handleChange={isSelected => handleInstanceSelection(eventIndex, instanceIndex, event.eventId, instance.id || '', isSelected)} />)}
            </ul>
        </div>
    );
};
