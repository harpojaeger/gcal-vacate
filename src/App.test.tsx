import { waitFor } from '@testing-library/dom'
import { storeFactory, AppState } from './store/root';
import { MockRpcClient } from '../test/mockGapi';
import '@testing-library/jest-dom';
import { EnhancedStore } from '@reduxjs/toolkit';
import { renderWithStore } from '../test/util';
import App from './App';
import React from 'react';

var store: EnhancedStore<AppState>;
var mockGapiClient: MockRpcClient;
const signInButtonLabel = /Log in/;
const signOutButtonLabel = /Click me to sign out/i;
beforeEach(() => {
  mockGapiClient = new MockRpcClient();
  store = storeFactory(mockGapiClient);
});

test("renders a loading state before the user's sign-in status is determined", () => {
  const { getByText } = renderWithStore(<App />, store);

  expect(getByText(/loading.../)).toBeInTheDocument();
});

test('renders a functioning sign-in affordance', async () => {
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

test('renders a functioning sign-out affordance', async () => {
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
