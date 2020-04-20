import { SET_SIGNIN_STATUS, SET_CALENDARS, UserActionType } from './types'

export function setSigninStatus(isSignedIn: boolean): UserActionType {
    return {
        type: SET_SIGNIN_STATUS,
        payload: isSignedIn
    }
}

export function setcalendars(calendars: gapi.client.calendar.CalendarListEntry[]): UserActionType {
    return {
        type: SET_CALENDARS,
        payload: calendars
    }
}