import { waitFor } from '@testing-library/dom'
import { storeFactory, AppState } from './store/root';
import { MockRpcClient } from './client/__mocks__/gapi';
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
})

test('renders correct sign-in and sign-out affordances', async () => {
  const signInButtonLabel = /Log in/;
  const signOutButtonLabel = /Click me to sign out/i;
  const { getByText } = renderWithStore(<App />, store);

  const signInButton = getByText(signInButtonLabel);
  signInButton.click();

  await waitFor(() => {
    const signOutButton = getByText(signOutButtonLabel);
    signOutButton.click();
  });

  await waitFor(() => {
    expect(getByText(signInButtonLabel)).toBeInTheDocument();
  });
})
