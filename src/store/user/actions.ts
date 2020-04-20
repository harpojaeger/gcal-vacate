import { SET_SIGNED_IN, SET_CALENDARS, UserActionType } from './types'

export function setSignedIn(isSignedIn: boolean): UserActionType {
    return {
        type: SET_SIGNED_IN,
        payload: isSignedIn
    }
}

export function setCalendars(calendars: gapi.client.calendar.CalendarListEntry[]): UserActionType {
    return {
        type: SET_CALENDARS,
        payload: calendars
    }
}