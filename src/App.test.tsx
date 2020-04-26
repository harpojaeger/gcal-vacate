import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom'
import App from './App';
import { Provider } from 'react-redux';
import { storeFactory, AppState } from './store/root';
import { MockRpcClient } from './client/__mocks__/gapi';
import '@testing-library/jest-dom';
import { EnhancedStore } from '@reduxjs/toolkit';

var store: EnhancedStore<AppState>;
var mockGapiClient: MockRpcClient;

beforeEach(() => {
  mockGapiClient = new MockRpcClient();
  store = storeFactory(mockGapiClient);
})

test('renders correct sign-in affordances', () => {
  const { getByText } = renderApp();

  const signInButton = getByText(/click me to launch a rad signin workflow/i);

  expect(signInButton).toBeInTheDocument();
});

test('renders correct sign-out affordance after signing in', async () => {
  const { getByText } = renderApp();

  const signInButton = getByText(/click me to launch a rad signin workflow/i);
  signInButton.click();

  await waitFor(() => {
    expect(getByText(/Click me to sign out :\(/i)).toBeInTheDocument();
  });
})

test('renders a list of calendars', async () => {
  const { getByText } = renderApp();

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

/**
 * Renders the app using a mocked GAPI RPC class.
 */
function renderApp() {
  return render(<React.StrictMode><Provider store={store}><App /></Provider></React.StrictMode>);
}
