import { SET_SELECTED_ID, CalendarActionType } from './types'

export function setSelectedId(id: string): CalendarActionType {
    return {
        type: SET_SELECTED_ID,
        payload: id
    }
}