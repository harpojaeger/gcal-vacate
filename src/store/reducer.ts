import { userReducer } from './user/reducers'
import { combineReducers, createStore } from 'redux'

export const rootReducer = combineReducers({ user: userReducer });
