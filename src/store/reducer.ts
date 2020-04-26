import { userReducer, UserState } from './user'
import { calendarReducer, CalendarState } from './calendar';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise';

export interface AppState {
    user: UserState,
    calendar: CalendarState

}

const rootReducer = combineReducers({ user: userReducer, calendar: calendarReducer });

export const store = createStore(
    rootReducer, {},
    compose(applyMiddleware(promiseMiddleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
);
