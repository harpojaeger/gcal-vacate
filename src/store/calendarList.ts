import { createAction, createReducer, ActionReducerMapBuilder } from '@reduxjs/toolkit';

export interface CalendarListState {
    selectedId: string
}

const initialState: CalendarListState = {
    selectedId: ''
}
export const setSelectedId = createAction<string>("SET_SELECTED_ID");

export const calendarListReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<CalendarListState>) => {
    builder.addCase(setSelectedId, (state, action) => {
        return { ...state, selectedId: action.payload }
    })
})
