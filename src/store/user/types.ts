export interface UserState {
    isSignedIn: boolean,
    calendars: gapi.client.calendar.CalendarListEntry[]
}

export const SET_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS'
export const SET_CALENDARS = 'UPDATE_CALENDARS'

interface SetSigninStatusActionType {
    type: typeof SET_SIGNIN_STATUS
    payload: boolean
}

interface SetCalendarsActionType {
    type: typeof SET_CALENDARS
    payload: gapi.client.calendar.CalendarListEntry[]
}

export type UserActionType = SetSigninStatusActionType | SetCalendarsActionType