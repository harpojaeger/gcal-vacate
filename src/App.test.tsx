import { waitFor } from '@testing-library/dom';
import { storeFactory, AppState } from './store/root';
import { MockRpcClient } from '../test/mockGapi';
import '@testing-library/jest-dom';
import { EnhancedStore } from '@reduxjs/toolkit';
import { renderWithStore } from '../test/util';
import App from './App';
import React from 'react';
import { RenderResult, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WORK_CALENDAR_ID } from '../test/fakeApiData';

var store: EnhancedStore<AppState>;
var mockGapiClient: MockRpcClient;
const signInButtonLabel = /Log in/;
const signOutButtonLabel = /Log out/i;
const searchButtonLabel = /Do a search/;
const calendarSelectLabel = /Select a calendar/;

beforeEach(() => {
    mockGapiClient = new MockRpcClient();
    store = storeFactory(mockGapiClient);
});

describe('the log in/out workflow', () => {
    it("renders a loading state before the user's sign-in status is determined", () => {
        const { getByText } = renderWithStore(<App />, store);

        expect(getByText(/loading.../)).toBeInTheDocument();
    });

    it('renders a functioning sign-out affordance', async () => {
        const { getByText } = renderWithStore(<App />, store);

        // Simulate the gapi starting up and determining, after a short wait, that the
        // user is already logged in.
        mockGapiClient.signIn();

        await waitFor(() => {
            const signOutButton = getByText(signOutButtonLabel);
            signOutButton.click();
        });

        await waitFor(() => {
            expect(getByText(signInButtonLabel)).toBeInTheDocument();
        });
    });

    it('renders a functioning sign-in affordance', async () => {
        const { getByText } = renderWithStore(<App />, store);

        // Simulate the gapi starting up and determining, after a short wait, that the
        // user is not logged in.
        mockGapiClient.signOut();

        await waitFor(() => {
            const signInButton = getByText(signInButtonLabel);
            signInButton.click();
        });

        await waitFor(() => {
            expect(getByText(signOutButtonLabel)).toBeInTheDocument();
        });
    });
});

describe('the signed-in state', () => {
    var dom: RenderResult;

    beforeEach(async () => {
        dom = renderWithStore(<App />, store);
        mockGapiClient.signOut();

        await waitFor(() => {
            const signInButton = dom.getByText(signInButtonLabel);
            signInButton.click();
        });
    });

    it("loads the user's calendars", async () => {
        await waitFor(() => {
            const calendarSelect = dom.getByText(calendarSelectLabel);
            expect(calendarSelect.parentElement?.childElementCount).toEqual(3);
        });
    });

    describe('the search form', () => {
        describe('the search button', () => {
            var searchButton: HTMLElement;

            beforeEach(async () => {
                await waitFor(() => {
                    searchButton = dom.getByText(searchButtonLabel);
                });
            });

            it('is disabled when no calendar is selected', async () => {
                expect(searchButton).toBeDisabled();
            });

            it('is enabled when a calendar is selected', async () => {
                const calendarSelect = dom.getByText(calendarSelectLabel)
                    .parentElement;
                expect(calendarSelect).toBeTruthy();
                if (calendarSelect) {
                    fireEvent.change(calendarSelect, {
                        target: { value: WORK_CALENDAR_ID },
                    });
                }

                await waitFor(() => {
                    expect(searchButton).toBeEnabled();
                });

                searchButton.click();
            });
        });

        it('returns a list of events with their instances', async () => {
            await waitFor(() => {
                expect(dom.getByText(searchButtonLabel)).toBeInTheDocument();
                const calendarSelect = dom.getByText(calendarSelectLabel)
                    .parentElement;
                expect(calendarSelect).toBeTruthy();
                if (calendarSelect) {
                    fireEvent.change(calendarSelect, {
                        target: { value: WORK_CALENDAR_ID },
                    });
                }
            });
            const searchButton = dom.getByText(searchButtonLabel);

            await waitFor(() => {
                expect(searchButton).toBeEnabled();
            });

            searchButton.click();

            await waitFor(() => {
                // expect(dom.getByText(/Reticulate splines/)).toBeInTheDocument();
            });
        });
    });
});
