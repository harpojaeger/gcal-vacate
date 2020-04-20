import { CalendarState, CalendarActionType, SET_SELECTED_ID } from './types'

const initialState: CalendarState = {
    selectedId: ''
}

export function calendarReducer(state = initialState, action: CalendarActionType): CalendarState {
    switch (action.type) {
        case SET_SELECTED_ID:
            return { ...state, ...{ selectedId: action.payload } };
        default:
            return state;
    }
}