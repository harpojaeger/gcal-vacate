import { createAction, createReducer, ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { thunkApiExtras } from './root';

export interface CalendarListState {
    selectedId: string
    fetchStatus: FetchStatus,
    calendarList: gapi.client.calendar.CalendarListEntry[],
}
enum FetchStatus {
    Pending,
    Fulfilled,
    Rejected,
    Unknown
};

const initialState: CalendarListState = {
    selectedId: '',
    fetchStatus: FetchStatus.Unknown,
    calendarList: [],
}

export const setSelectedId = createAction<string>("SET_SELECTED_ID");

export const fetchCalendars =
    createAsyncThunk<
        gapi.client.calendar.CalendarListEntry[],
        /** This action creator accepts no arguments, so the first argument to
         * the payload creator is unused. */
        void,
        /** Parameterizing the type this way allows us to access the thunk
         * config extra argument  */
        { extra: thunkApiExtras }
    >("calendarList/fetch", async (unused, { extra: { rpcClient } }) => {
        return rpcClient.listCalendars({ minAccessRole: 'writer' });

    });

export const calendarListReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<CalendarListState>) => {
    builder.addCase(setSelectedId, (state, action) => {
        return { ...state, selectedId: action.payload }
    });

    builder.addCase(fetchCalendars.pending, (state) => ({ ...state, fetchStatus: FetchStatus.Pending }));
    builder.addCase(fetchCalendars.fulfilled, (state, action) => {
        return {
            ...state,
            status: FetchStatus.Fulfilled,
            calendarList: action.payload,
        }
    });
    builder.addCase(fetchCalendars.rejected, state => ({ ...state, fetchStatus: FetchStatus.Rejected }));
})
