import { userReducer } from './user/reducers'
import { UserState } from './user/types'
import { calendarReducer } from './calendar/reducers';
import { CalendarState } from './calendar/types';
import { combineReducers, createStore } from 'redux'

export interface AppState {
    user: UserState,
    calendar: CalendarState

}

export const rootReducer = combineReducers({ user: userReducer, calendar: calendarReducer });

export const store = createStore(rootReducer, {}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());
