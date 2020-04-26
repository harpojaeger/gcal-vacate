type clientOpts = { apiKey: string, clientId: string, scope: string, discoveryDocs: string[] };
export interface RpcClient {
    signIn(): void,
    signOut(): void,
    listCalendars(opts: { minAccessRole: string }): Promise<gapi.client.calendar.CalendarListEntry[]>
}

export class GapiClient implements RpcClient {

    signInListener: (isSignedIn: boolean) => void;

    constructor(opts: clientOpts, signInListener: ((isSignedIn: boolean) => void)) {
        this.signInListener = signInListener;
        // Load the authentication module
        gapi.load('client:auth2', () => this.initClient(opts));
    }

    initClient(opts: clientOpts) {
        gapi.client.init(opts).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.signInListener);
            this.signInListener(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    signIn() {
        gapi.auth2.getAuthInstance().signIn();
    }

    signOut() {
        gapi.auth2.getAuthInstance().signOut();
    }

    listCalendars(opts: { minAccessRole: string }): Promise<gapi.client.calendar.CalendarListEntry[]> {
        return gapi.client.calendar.calendarList.list(opts).then(
            (result: gapi.client.Response<gapi.client.calendar.CalendarList>) => {
                if (result?.result?.items) return result.result.items;
                return [];
            }
        );
    }
}
