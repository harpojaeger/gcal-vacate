import { userReducer } from './user/reducers'
import { UserState } from './user/types'
import { combineReducers, createStore } from 'redux'

export interface AppState {
    user: UserState
}

export const rootReducer = combineReducers({ user: userReducer });

export const store = createStore(rootReducer);
