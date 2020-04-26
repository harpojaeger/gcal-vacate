import { userReducer, UserState } from './user'
import { calendarListReducer, CalendarListState } from './calendarList';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise';

export interface AppState {
    user: UserState,
    calendarList: CalendarListState

}

const rootReducer = combineReducers({ user: userReducer, calendarList: calendarListReducer });

export const store = createStore(
    rootReducer, {},
    compose(applyMiddleware(promiseMiddleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
);
