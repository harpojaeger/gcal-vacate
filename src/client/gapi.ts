type clientOpts = { apiKey: string, clientId: string, scope: string, discoveryDocs: string[] };

export type signInListener = ((isSignedIn: boolean) => void);
export interface RpcClient {
    signIn(): void,
    signOut(): void,
    listCalendars(opts: { minAccessRole: string }): Promise<gapi.client.calendar.CalendarListEntry[]>,
    getIsSignedIn(): boolean,
    setSignInListener(listener: signInListener): void,
    listRepeatingEventInstances(timeMin: Date, timeMax: Date, calendarId: string): Promise<EventWithInstances[]>,
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

    async listRepeatingEventInstances(timeMin: Date, timeMax: Date, calendarId: string): Promise<EventWithInstances[]> {
        const events = await this.listAllEvents(calendarId, timeMin, timeMax);

        /** In the batch request, individual requests for the instances of a
         * repeating event will be identified by their event ID. This map
         * associates that ID with the event's description, so that both can
         * later be returned along with the individual instances. */
        const eventDetailsMap: EventDetails = {};

        const batch = gapi.client.newBatch();

        events.forEach(({ id, recurrence, status, description }) => {
            if (id && recurrence && status === 'confirmed') {
                eventDetailsMap[id] = description;
                batch.add(
                    this.createInstancesRequest(id, calendarId, timeMin, timeMax), { id, callback: () => undefined }
                );
            }
        });

        const eventsWithInstances: EventWithInstances[] = [];

        const { result: batchResult } = await batch;

        for (let [eventId, description = ''] of Object.entries(eventDetailsMap)) {
            const instances = (batchResult[eventId] as gapi.client.Response<gapi.client.calendar.Events>).result.items || [];
            eventsWithInstances.push({ description, calendarId, eventId, instances })
        }
        return eventsWithInstances;
    }

    private async listAllEvents(calendarId: string, timeMin: Date, timeMax: Date): Promise<gapi.client.calendar.Event[]> {
        const response = await gapi.client.calendar.events.list({
            calendarId,
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
        });
        if (!response?.result?.items) return [];
        return response.result.items;
    }

    private createInstancesRequest(eventId: string, calendarId: string, timeMin: Date, timeMax: Date): gapi.client.Request<gapi.client.calendar.Event> {
        return gapi.client.calendar.events.instances({
            calendarId,
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            eventId,
        })
    }
}

// Associates an event ID with its display name
interface EventDetails {
    [key: string]: string | undefined
}

export interface EventWithInstances {
    description: string,
    calendarId: string,
    eventId: string,
    instances: gapi.client.calendar.Event[]
}


export interface FetchEventOpts {
    timeMin: Date,
    timeMax: Date,
    calendarId: string,
}
/** Convenience method for making a call to fetch repeating event instances from
 * using an RpcClient. */
export const fetchRepeatingEventInstances =
    (rpcClient: RpcClient, params: FetchEventOpts): Promise<EventWithInstances[]> =>
        rpcClient.listRepeatingEventInstances(params.timeMin, params.timeMax, params.calendarId);
