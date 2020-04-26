import { userReducer, UserState } from './user'
import { calendarListReducer, CalendarListState } from './calendarList';
import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { RpcClient } from '../client/gapi';

export interface AppState {
    user: UserState,
    calendarList: CalendarListState
}

export interface thunkApiExtras {
    rpcClient: RpcClient
}

const rootReducer = combineReducers({ user: userReducer, calendarList: calendarListReducer });


export function storeFactory(rpcClient: RpcClient) {
    const middlewareToUse = getDefaultMiddleware({ thunk: { extraArgument: { rpcClient } } });
    return configureStore({
        reducer: rootReducer,
        middleware: middlewareToUse
    })
}
