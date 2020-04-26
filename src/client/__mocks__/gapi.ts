import { RpcClient, signInListener } from "../gapi";

export class MockRpcClient implements RpcClient {

    signInListener: signInListener = function () { };
    calendars: gapi.client.calendar.CalendarListEntry[] = [];

    signIn() {
        this.signInListener(true);
    }

    signOut() {
        this.signInListener(false);
    }

    listCalendars({ minAccessRole }: { minAccessRole: string }) {
        return Promise.resolve(this.calendars);
    }

    setSigninListener(listener: signInListener) {
        this.signInListener = listener;
    }

    getIsSignedIn() {
        return true;
    }

    setSignInListener(listener: signInListener) {
        this.signInListener = listener;
    }

    setMockCalendarList(calendars: gapi.client.calendar.CalendarListEntry[]) {
        this.calendars = calendars;
    }
}
