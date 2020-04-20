import React, { Component } from 'react';

type calendarListProps = { calendars: gapi.client.calendar.CalendarListEntry[] };

export default class CalendarList extends Component<calendarListProps, {}> {
    render() {
        return (
            <div>
                <select>
                    <option value=''>
                        Select a calendar...
                    </option>
                    {this.props.calendars.map(calendar)}
                </select>
            </div>
        )
    }
}

function calendar({ id, backgroundColor, foregroundColor: color, summary }: gapi.client.calendar.CalendarListEntry) {
    return (
        <option key={id} value={id} style={{ backgroundColor, color }}>
            {summary}
        </option>
    )
}