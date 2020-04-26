import { renderApp } from "../../test/util";
import { waitFor } from '@testing-library/dom'
import { EnhancedStore } from "@reduxjs/toolkit";
import { AppState, storeFactory } from "../store/root";
import { MockRpcClient } from "../client/__mocks__/gapi";

var store: EnhancedStore<AppState>;
var mockGapiClient: MockRpcClient;

beforeEach(() => {
    mockGapiClient = new MockRpcClient();
    store = storeFactory(mockGapiClient);
})

test('renders a list of calendars', async () => {
    const { getByText } = renderApp(store);

    const signInButton = getByText(/click me to launch a rad signin workflow/i);
    signInButton.click();

    await waitFor(() => {
        const listCalendarsButton = getByText(/Click me to list calendars/);

        mockGapiClient.setMockCalendarList([{ id: 'foo' }, { id: 'bar' }]);
        listCalendarsButton.click();
    });

    await waitFor(() => {
        const calendarSelect = getByText(/Select a calendar/);
        expect(calendarSelect.parentElement?.childElementCount).toBe(3);
    });

});
