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

beforeEach(() => {
  mockGapiClient = new MockRpcClient();
  store = storeFactory(mockGapiClient);
});

test("renders a loading state before the user's sign-in status is determined", () => {
  const { getByText } = renderWithStore(<App />, store);

  expect(getByText(/loading.../)).toBeInTheDocument();
});

test('renders correct sign-in and sign-out affordances', async () => {
  const signInButtonLabel = /Log in/;
  const signOutButtonLabel = /Click me to sign out/i;
  const { getByText } = renderWithStore(<App />, store);

  mockGapiClient.signOut();

  await waitFor(() => {
    const signInButton = getByText(signInButtonLabel);
    signInButton.click();
  });

  await waitFor(() => {
    const signOutButton = getByText(signOutButtonLabel);
    signOutButton.click();
  });

  await waitFor(() => {
    expect(getByText(signInButtonLabel)).toBeInTheDocument();
  });
});
