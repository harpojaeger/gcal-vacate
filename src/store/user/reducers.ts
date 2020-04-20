import { UserState, UserActionType, SET_CALENDARS, SET_SIGNIN_STATUS } from './types'

const initialState: UserState = {
    isSignedIn: false,
    calendars: []
}

export function userReducer(state = initialState, action: UserActionType): UserState {
    switch (action.type) {
        case SET_CALENDARS:
            return Object.assign({}, state, { calendars: action.payload });
        case SET_SIGNIN_STATUS:
            return Object.assign({}, state, { isSignedIn: action.payload });
        default:
            return state;
    }
}