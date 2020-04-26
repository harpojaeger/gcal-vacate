import { createAction } from '@reduxjs/toolkit';
import { SET_SIGNED_IN, SET_CALENDARS, UserActionType, FETCH_CALENDAR_LIST } from './types'

export const setSignedIn = createAction<boolean>(SET_SIGNED_IN);

export const setCalendars = createAction<gapi.client.calendar.CalendarListEntry[]>(SET_CALENDARS);

// export function fetchCalendarList(): Promise<UserActionType> {
//     return (dispatch: function) => {
//         return Promise.resolve([]).then(calendars => dispatch(setCalendars(calendars)));
//     }
// }
