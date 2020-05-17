import {
    createReducer,
    ActionReducerMapBuilder,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import { thunkApiExtras } from './root';
import { resetEventSearchStatus } from './events';
import { AsyncOperationStatus } from './enums';

export interface CalendarListState {
    selectedId: string;
    fetchStatus: AsyncOperationStatus;
    calendarList: gapi.client.calendar.CalendarListEntry[];
}

const initialState: CalendarListState = {
    selectedId: '',
    fetchStatus: AsyncOperationStatus.UNKNOWN,
    calendarList: [],
};

export const setSelectedId = createAsyncThunk(
    'SET_SELECTED_ID',
    async (id: string, { dispatch }) => {
        dispatch(resetEventSearchStatus());
        return id;
    }
);

export const fetchCalendars = createAsyncThunk<
    gapi.client.calendar.CalendarListEntry[],
    /** This action creator accepts no arguments, so the first argument to
     * the payload creator is unused. */
    void,
    /** Parameterizing the type this way allows us to access the thunk
     * config extra argument  */
    { extra: thunkApiExtras }
>('calendarList/fetch', async (unused, { extra: { rpcClient }, dispatch }) => {
    // When the user switches the selected calendar, the store should be
    // updated to reflect that a search for events on that calendar has not
    // yet started.
    dispatch(resetEventSearchStatus());
    return rpcClient.listCalendars({ minAccessRole: 'writer' });
});

export const calendarListReducer = createReducer(
    initialState,
    (builder: ActionReducerMapBuilder<CalendarListState>) => {
        builder.addCase(setSelectedId.fulfilled, (state, action) => {
            state.selectedId = action.payload;
        });

        builder.addCase(fetchCalendars.pending, (state) => {
            state.fetchStatus = AsyncOperationStatus.PENDING;
        });
        builder.addCase(fetchCalendars.fulfilled, (state, action) => {
            state.fetchStatus = AsyncOperationStatus.FULFILLED;
            state.calendarList = action.payload;
        });
        builder.addCase(fetchCalendars.rejected, (state) => {
            state.fetchStatus = AsyncOperationStatus.REJECTED;
        });
    }
);
