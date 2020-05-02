import { createReducer, createAsyncThunk, ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';
import { EventWithInstances, fetchRepeatingEventInstances, FetchEventOpts } from '../client/gapi';
import { thunkApiExtras } from './root';
import { AsyncOperationStatus } from "./enums";

export interface SelectableEventInstance extends gapi.client.calendar.Event {
    selected: boolean,
}
export interface EventWithSelectableInstances extends EventWithInstances {
    instances: SelectableEventInstance[];
}
export interface EventsState {
    searchStatus: AsyncOperationStatus,
    events: EventWithSelectableInstances[],
}

export const initialState: EventsState = {
    searchStatus: AsyncOperationStatus.UNSTARTED,
    events: [],
}

export const resetEventSearchStatus = createAction('events/resetSearchStatus');

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
    builder.addCase(resetEventSearchStatus, state => {
        return {
            ...state,
            searchStatus: AsyncOperationStatus.UNSTARTED,
        }
    });

    builder.addCase(fetchEventInstances.pending, (state, unusedPayload) => ({
        ...state, events: [], searchStatus: AsyncOperationStatus.PENDING
    }));
    builder.addCase(fetchEventInstances.fulfilled, (state, { payload: retrievedEvents }) => {
        return {
            ...state,
            events: retrievedEvents.map(buildEventWithSelectableInstances),
            searchStatus: AsyncOperationStatus.FULFILLED
        };
    });
    builder.addCase(fetchEventInstances.rejected, (state, action) => ({ ...state, searchStatus: AsyncOperationStatus.REJECTED }));

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
