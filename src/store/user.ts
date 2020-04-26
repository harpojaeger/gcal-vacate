import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit'

export interface UserState {
    isSignedIn: boolean,
    calendars: gapi.client.calendar.CalendarListEntry[]
}

const initialState: UserState = {
    isSignedIn: false,
    calendars: []
}

export const setSignedIn = createAction<boolean>("SET_SIGNED_IN");

export const setCalendars = createAction<gapi.client.calendar.CalendarListEntry[]>("SET_CALENDARS");

export const userReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(setSignedIn, (state, action) => {
        return { ...state, isSignedIn: action.payload }

    });

    builder.addCase(setCalendars, (state, action) => {
        return { ...state, calendars: action.payload }
    })
})
