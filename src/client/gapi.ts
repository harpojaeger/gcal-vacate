type clientOpts = { apiKey: string, clientId: string, scope: string, discoveryDocs: string[] };

export type signInListener = ((isSignedIn: boolean) => void);
export interface eventsMap {
    [key: string]: Event
}
export interface RpcClient {
    signIn(): void,
    signOut(): void,
    listCalendars(opts: { minAccessRole: string }): Promise<gapi.client.calendar.CalendarListEntry[]>,
    getIsSignedIn(): boolean,
    setSignInListener(listener: signInListener): void,
}

export class GapiClient implements RpcClient {

    signInListener: signInListener = function () { };

    constructor(opts: clientOpts) {
        // Load the authentication module
        gapi.load('client:auth2', () => this.initClient(opts));
    }

    initClient(opts: clientOpts) {
        return gapi.client.init(opts).then(() => {
            // Setting the listener this way allows us to swap in a different
            // listener funtion at any time.
            gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => this.signInListener(isSignedIn));
            this.signInListener(this.getIsSignedIn());
        });
    }

    signIn() {
        gapi.auth2.getAuthInstance().signIn();
    }

    signOut() {
        gapi.auth2.getAuthInstance().signOut();
    }

    getIsSignedIn() {
        return gapi.auth2?.getAuthInstance().isSignedIn.get();
    }

    setSignInListener(listener: signInListener) {
        this.signInListener = listener;
    }

    listCalendars(opts: { minAccessRole: string }): Promise<gapi.client.calendar.CalendarListEntry[]> {
        return gapi.client.calendar.calendarList.list(opts).then(
            (result: gapi.client.Response<gapi.client.calendar.CalendarList>) => {
                if (result?.result?.items) return result.result.items;
                return [];
            }
        );
    }

    async listEvents(minDate: Date, maxDate: Date, calendarId: string): Promise<void> {
        const result = await gapi.client.calendar.events.list({
            calendarId,
            timeMin: minDate.toISOString(),
            timeMax: maxDate.toISOString(),
        });
        // if (!result?.result?.items) return [];
        const items = result.result.items;
        // const repeatingEventInstances
        const instancesRequest = gapi.client.newBatch();
        instancesRequest.add(
            gapi.client.calendar.events.instances({
                calendarId,
                timeMin: minDate.toISOString(),
                timeMax: maxDate.toISOString(),
                eventId: 'foo'
            })
        );
        const batchResult = await instancesRequest;
        for (let obj in batchResult.result) {
            console.log(typeof obj);
        }

    }
}
