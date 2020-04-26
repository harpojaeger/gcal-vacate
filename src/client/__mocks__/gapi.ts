import { RpcClient, signInListener } from "../gapi";

export class MockRpcClient implements RpcClient {

    signInListener: signInListener = function () { };

    signIn() {
        this.signInListener(true);
    }

    signOut() {
        this.signInListener(false);
    }

    listCalendars({ minAccessRole }: { minAccessRole: string }) {
        const fakeCalendar: gapi.client.calendar.CalendarListEntry = {}
        return Promise.resolve([fakeCalendar]);
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

}
