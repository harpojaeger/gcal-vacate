import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/root'
import { setSelectedId } from '../../store/calendar'

type calendarListProps = {
    selectedId: string,
    calendars: gapi.client.calendar.CalendarListEntry[]
    setSelectedId: Function
};

const mapStatetoProps = (state: AppState) => ({
    selectedId: state.calendar.selectedId
});
const mapDispatchToProps = { setSelectedId };

class CalendarList extends Component<calendarListProps, {}> {
    constructor(props: calendarListProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setSelectedId(e.target.value);
    }
    render() {
        return (
            <div>
                <select value={this.props.selectedId} onChange={this.handleChange}>
                    <option value=''>
                        Select a calendar...
                    </option>
                    {this.props.calendars.map(calendar)}
                </select>
            </div>
        )
    }
}

function calendar({ id, summary }: gapi.client.calendar.CalendarListEntry) {
    return (
        <option key={id} value={id}>
            {summary}
        </option>

    )
}

export default connect(mapStatetoProps, mapDispatchToProps)(CalendarList);
