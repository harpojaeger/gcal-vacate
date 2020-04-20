import React, { Component } from 'react';


type calendarListProps = { calendars: gapi.client.calendar.CalendarListEntry[] };

export default class CalendarList extends Component<calendarListProps, {}> {
    render() {
        return (
            <div>
                <ul>
                    {this.props.calendars.map((cal) => (<li key={cal.id}>{cal.summary}</li>))}
                </ul>
            </div>
        )
    }
}