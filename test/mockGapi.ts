import { RpcClient, signInListener, EventWithInstances } from "../src/client/gapi";

export class MockRpcClient implements RpcClient {
    isSignedIn = false;
    signInListener: signInListener = function () { };
    calendars: gapi.client.calendar.CalendarListEntry[] = [];

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
        listener(false);
    }

    setMockCalendarList(calendars: gapi.client.calendar.CalendarListEntry[]) {
        this.calendars = calendars;
    }

    listRepeatingEventInstances(timeMin: Date, timeMax: Date, calendarId: string): Promise<EventWithInstances[]> {
        throw new Error("Method not implemented.");
    }
}
