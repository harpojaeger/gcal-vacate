import { EventWithInstances } from '../src/client/gapi';

// To allow other modules to access these objects without worrying about nulls,
// we extend the type and make the properties we're interested in non-nullable.
interface FakeCalendar extends gapi.client.calendar.CalendarListEntry {
    id: string;
    summary: string;
}

const WORK_CALENDAR_ID = 'work-calendar';

export const WORK_CALENDAR: FakeCalendar = {
    id: WORK_CALENDAR_ID,
    summary: 'awesome calendar',
};

export const PERSONAL_CALENDAR: FakeCalendar = {
    id: 'personal-calendar',
    summary: 'cool calendar',
};

const RECURRING_MEETING: EventWithInstances = {
    summary: 'Important meeting',
    calendarId: WORK_CALENDAR_ID,
    eventId: 'a-meeting',
    instances: [
        {
            id: '1',
            start: {
                dateTime: '2020-01-01T11:00:00.000Z',
            },
            end: {
                dateTime: '2020-01-01T12:00:00.000Z',
            },
        },
        {
            id: '2',
            start: {
                dateTime: '2020-01-02T11:00:00.000Z',
            },
            end: {
                dateTime: '2020-01-02T12:00:00.000Z',
            },
        },
        {
            id: '3',
            start: {
                dateTime: '2020-01-03T11:00:00.000Z',
            },
            end: {
                dateTime: '2020-01-03T12:00:00.000Z',
            },
        },
    ],
};

const RECURRING_LUNCH: EventWithInstances = {
    summary: 'Important lunch',
    calendarId: WORK_CALENDAR_ID,
    eventId: 'a-lunch',
    instances: [
        {
            id: '1',
            start: {
                dateTime: '2020-01-01T12:00:00.000Z',
            },
            end: {
                dateTime: '2020-01-01T13:00:00.000Z',
            },
        },
        {
            id: '2',
            start: {
                dateTime: '2020-01-02T12:00:00.000Z',
            },
            end: {
                dateTime: '2020-01-02T13:00:00.000Z',
            },
        },
        {
            id: '3',
            start: {
                dateTime: '2020-01-03T12:00:00.000Z',
            },
            end: {
                dateTime: '2020-01-03T13:00:00.000Z',
            },
        },
    ],
};

const ALL_DAY_EVENT: EventWithInstances = {
    summary: 'Reticulate splines',
    calendarId: WORK_CALENDAR_ID,
    eventId: 'reticulate-splines',
    instances: [
        {
            id: '1',
            start: {
                date: '2020-02-01',
            },
            end: {
                dateTime: '2020-02-02',
            },
        },
        {
            id: '2',
            start: {
                date: '2020-02-08',
            },
            end: {
                dateTime: '2020-02-09',
            },
        },
        {
            id: '3',
            start: {
                date: '2020-02-15',
            },
            end: {
                dateTime: '2020-02-16',
            },
        },
    ],
};

export const FAKE_REPEATING_EVENTS: EventWithInstances[] = [
    RECURRING_LUNCH,
    RECURRING_MEETING,
    ALL_DAY_EVENT,
];
