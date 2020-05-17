import {
    RpcClient,
    signInListener,
    EventWithInstances,
} from '../src/client/gapi';

// To allow other modules to access these objects without worrying about nulls,
// we extend the type and make the properties we're interested in non-nullable.
interface FakeCalendar extends gapi.client.calendar.CalendarListEntry {
    id: string;
    summary: string;
}

export const FIRST_CALENDAR: FakeCalendar = {
    id: 'first-id',
    summary: 'awesome calendar',
};
export const SECOND_CALENDAR: FakeCalendar = {
    id: 'second-id',
    summary: 'cool calendar',
};

export class MockRpcClient implements RpcClient {
    isSignedIn = false;
    signInListener: signInListener = function () {};
    calendars: gapi.client.calendar.CalendarListEntry[] = [
        FIRST_CALENDAR,
        SECOND_CALENDAR,
    ];

    signIn() {
        this.isSignedIn = true;
        this.signInListener(true);
    }

    signOut() {
        this.isSignedIn = false;
        this.signInListener(false);
    }

    listCalendars({ minAccessRole }: { minAccessRole: string }) {
        return Promise.resolve(this.calendars);
    }

    getIsSignedIn() {
        return this.isSignedIn;
    }

    setSignInListener(listener: signInListener) {
        this.signInListener = listener;
    }

    setMockCalendarList(calendars: gapi.client.calendar.CalendarListEntry[]) {
        this.calendars = calendars;
    }

    listRepeatingEventInstances(
        timeMin: Date,
        timeMax: Date,
        calendarId: string
    ): Promise<EventWithInstances[]> {
        throw new Error('Method not implemented.');
    }
}
