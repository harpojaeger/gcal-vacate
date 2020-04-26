import { createAction, createReducer, ActionReducerMapBuilder } from '@reduxjs/toolkit';

export interface CalendarState {
    selectedId: string
}

const initialState: CalendarState = {
    selectedId: ''
}
export const setSelectedId = createAction<string>("SET_SELECTED_ID");

export const calendarReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<CalendarState>) => {
    builder.addCase(setSelectedId, (state, action) => {
        return { ...state, selectedId: action.payload }
    })
})
