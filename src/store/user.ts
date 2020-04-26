import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit'
import { thunkApiExtras } from './root';
import { signInListener } from '../client/gapi';

export interface UserState {
    isSignedIn: boolean,
    calendars: gapi.client.calendar.CalendarListEntry[]
}

export const initialState: UserState = {
    isSignedIn: false,
    calendars: []
}

export const setCalendars = createAction<gapi.client.calendar.CalendarListEntry[]>("SET_CALENDARS");

export const requestSignIn = createAsyncThunk<void, void, { extra: thunkApiExtras }>('user/requestSignIn', async (unused, { extra: { rpcClient } }) => {
    rpcClient.signIn();
});

export const requestSignOut = createAsyncThunk<void, void, { extra: thunkApiExtras }>('user/requestSignOut', async (unused, { extra: { rpcClient } }) => {
    rpcClient.signOut();
});

export const updateSignInStatus = createAsyncThunk<boolean, void, { extra: thunkApiExtras }>('user/updateSignInStatus', async (unused, { extra: { rpcClient } }) => {
    return rpcClient.getIsSignedIn();
});

export const setSignInListener = createAsyncThunk<void, signInListener, { extra: thunkApiExtras }>('user/setSignInListener', async (listener, { extra: { rpcClient } }) => {
    rpcClient.setSignInListener(listener);
});

export const userReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(setCalendars, (state, { payload: calendars }) => ({ ...state, calendars }));

    builder.addCase(updateSignInStatus.fulfilled, (state, { payload: isSignedIn }) => ({ ...state, isSignedIn }));

});
