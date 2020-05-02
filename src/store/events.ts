import { createReducer, createAsyncThunk, ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';
import { EventWithInstances, fetchRepeatingEventInstances, FetchEventOpts } from '../client/gapi';
import { thunkApiExtras } from './root';

export interface SelectableEventInstance extends gapi.client.calendar.Event {
    selected: boolean,
}
export interface EventWithSelectableInstances extends EventWithInstances {
    instances: SelectableEventInstance[];
}
export interface EventsState {
    events: EventWithSelectableInstances[],
}

export const initialState: EventsState = {
    events: [],
}

export const fetchEventInstances = createAsyncThunk
    <EventWithInstances[], FetchEventOpts, { extra: thunkApiExtras }>
    ('eventInstances/fetch',
        async (actionOpts, thunkApi) => fetchRepeatingEventInstances(thunkApi.extra.rpcClient, actionOpts)
    );

interface SetInstanceSelectedParams {
    eventIndex: number,
    instanceIndex: number,
    eventId: string,
    instanceId: string,
    selected: boolean,
}
export const setInstanceSelected = createAction<SetInstanceSelectedParams>("setInstanceSelected");

export const eventsReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<EventsState>) => {
    builder.addCase(fetchEventInstances.pending, (state, unusedPayload) => ({
        ...state, events: []
    }));
    builder.addCase(fetchEventInstances.fulfilled, (state, { payload: retrievedEvents }) => {
        return {
            ...state,
            events: retrievedEvents.map(buildEventWithSelectableInstances)
        };
    });

    builder.addCase(setInstanceSelected, (state, action) => {
        const targetEvent = state.events[action.payload.eventIndex];
        if (targetEvent.eventId !== action.payload.eventId) throw new Error("Event state has unexpected shape. Couldn't find the correct event.");
        const targetInstance = targetEvent.instances[action.payload.instanceIndex];
        if (targetInstance.id !== action.payload.instanceId) throw new Error("Event state has unexpected shape. Can't find the correct instance of the repeating event.");

        state.events[action.payload.eventIndex].instances[action.payload.instanceIndex].selected = action.payload.selected;
        return state;
    })
});

// By default, events retrieved should be selected in the UI.
function buildSelectableInstance(instance: gapi.client.calendar.Event): SelectableEventInstance {
    return { ...instance, selected: true };
}

function buildEventWithSelectableInstances(event: EventWithInstances): EventWithSelectableInstances {
    return { ...event, instances: event.instances.map(buildSelectableInstance) };
}
