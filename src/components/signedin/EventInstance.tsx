import React from 'react';
import { SelectableEventInstance } from '../../store/events';

type BooleanFunction = (isSelected: boolean) => void;

export default ({ instance, handleChange }: { instance: SelectableEventInstance, handleChange: BooleanFunction }) => {
    const isAllDayEvent: boolean = instance.start?.dateTime === undefined;
    let formattedStartTime: string = '';
    let formattedEndTime: string = '';
    // This still needs some adjustment, as it shows one-day all-day events
    // as lasting from the day they are on until the next day. Workable for now.
    if (isAllDayEvent) {
        if (instance.start?.date) {
            formattedStartTime = new Date(Date.parse(instance.start.date)).toLocaleDateString();
        }
        if (instance.end?.date) {
            formattedEndTime = new Date(Date.parse(instance.end.date)).toLocaleDateString();
        }
    } else {
        if (instance.start?.dateTime) {
            formattedStartTime = new Date(Date.parse(instance.start.dateTime)).toLocaleString();
        }
        if (instance.end?.dateTime) {
            formattedEndTime = new Date(Date.parse(instance.end.dateTime)).toLocaleString();
        }
    }


    return (
        <li key={instance.id}>
            <input type="checkbox" checked={instance.selected} onChange={
                () => handleChange(!instance.selected)
            }></input>
                from {formattedStartTime} to {formattedEndTime}. selected: {instance.selected ? 'yup' : 'nope'}
        </li>
    )
}
