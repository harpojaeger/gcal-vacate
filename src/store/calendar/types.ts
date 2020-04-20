export interface CalendarState {
    selectedId: string
}

export const SET_SELECTED_ID = 'SET_SELECTED_ID'

interface SetSelectedIdActionType {
    type: typeof SET_SELECTED_ID
    payload: string
}

export type CalendarActionType = SetSelectedIdActionType