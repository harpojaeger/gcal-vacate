import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/root';
import { AsyncOperationStatus } from '../../store/enums';
import Event from './Event';

export default () => {
    const events = useSelector((state: AppState) => state.events.events);
    const searchStatus = useSelector(
        (state: AppState) => state.events.searchStatus
    );
    let content;
    switch (searchStatus) {
        case AsyncOperationStatus.FULFILLED:
            content =
                events.length > 0
                    ? events.map((event, index) => (
                          <Event
                              key={event.eventId}
                              event={event}
                              eventIndex={index}
                          />
                      ))
                    : 'No events found';
            break;
        case AsyncOperationStatus.PENDING:
            content = 'Searching...';
            break;
        case AsyncOperationStatus.REJECTED:
            content = 'Error while searching for events.';
            break;
        default:
            content = '';
    }
    return <div>{content}</div>;
};
