import { createAction, createReducer } from '@reduxjs/toolkit';
import { EventWithInstances } from '../client/gapi';


export interface EventsState {
    events: EventWithInstances[],
}
