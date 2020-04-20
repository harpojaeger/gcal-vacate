export interface UserState {
    isSignedIn: boolean,
    calendars: gapi.client.calendar.CalendarListEntry[]
}

export const SET_SIGNED_IN = 'UPDATE_SIGNIN_STATUS'
export const SET_CALENDARS = 'UPDATE_CALENDARS'

interface SetSignedInActionType {
    type: typeof SET_SIGNED_IN
    payload: boolean
}

interface SetCalendarsActionType {
    type: typeof SET_CALENDARS
    payload: gapi.client.calendar.CalendarListEntry[]
}

export type UserActionType = SetSignedInActionType | SetCalendarsActionType