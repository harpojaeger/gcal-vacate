import { waitFor } from '@testing-library/dom'
import { storeFactory, AppState } from './store/root';
import { MockRpcClient } from './client/__mocks__/gapi';
import '@testing-library/jest-dom';
import { EnhancedStore } from '@reduxjs/toolkit';
import { renderApp } from '../test/util';

var store: EnhancedStore<AppState>;
var mockGapiClient: MockRpcClient;

beforeEach(() => {
  mockGapiClient = new MockRpcClient();
  store = storeFactory(mockGapiClient);
})

test('renders correct sign-in affordances', () => {
  const { getByText } = renderApp(store);

  const signInButton = getByText(/click me to launch a rad signin workflow/i);

  expect(signInButton).toBeInTheDocument();
});

test('renders correct sign-out affordance after signing in', async () => {
  const { getByText } = renderApp(store);

  const signInButton = getByText(/click me to launch a rad signin workflow/i);
  signInButton.click();

  await waitFor(() => {
    expect(getByText(/Click me to sign out :\(/i)).toBeInTheDocument();
  });
})
