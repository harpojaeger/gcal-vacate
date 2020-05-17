import {
    RpcClient,
    signInListener,
    EventWithInstances,
} from '../src/client/gapi';
import {
    WORK_CALENDAR,
    PERSONAL_CALENDAR,
    FAKE_REPEATING_EVENTS,
} from './fakeApiData';

export class MockRpcClient implements RpcClient {
    isSignedIn = false;
    signInListener: signInListener = function () {};
    calendars: gapi.client.calendar.CalendarListEntry[] = [
        WORK_CALENDAR,
        PERSONAL_CALENDAR,
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
        return Promise.resolve(FAKE_REPEATING_EVENTS);
    }
}
