import { createAction, createReducer } from '@reduxjs/toolkit';
import { eventsMap } from '../client/gapi';


export interface EventsState {
    events: eventsMap,
}
