import { createAction, createReducer, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { EventWithInstances, fetchRepeatingEventInstances, FetchEventOpts } from '../client/gapi';
import { thunkApiExtras } from './root';


export interface EventsState {
    events: EventWithInstances[],
}

export const initialState: EventsState = {
    events: [],
}

export const fetchEventInstances = createAsyncThunk
    <EventWithInstances[], FetchEventOpts, { extra: thunkApiExtras }>
    ('eventInstances/fetch',
        async (actionOpts, thunkApi) => fetchRepeatingEventInstances(thunkApi.extra.rpcClient, actionOpts)
    );

export const eventsReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<EventsState>) => {
    builder.addCase(fetchEventInstances.pending, (state, unusedPayload) => ({
        ...state, events: []
    }));
    builder.addCase(fetchEventInstances.fulfilled, (state, action) => ({
        ...state,
        events: action.payload
    }));
});
