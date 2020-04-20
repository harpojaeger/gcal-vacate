import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/reducer';

test('renders learn react link', () => {
  mockGapi();
  const { getByText } = renderAppWithStore();
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders correct sign-in affordances', () => {
  mockGapi();
  const { getByText } = renderAppWithStore();
  const signInButton = getByText(/click me to launch a rad signin workflow/i);
  expect(signInButton).toBeInTheDocument();
})

test('renders correct sign-out affordance after signing in', async () => {
  const mockGapiObject = mockGapi();
  const mockSignInMethod = jest.fn();
  mockGapiObject.auth2.getAuthInstance.mockImplementation(() => ({ signIn: mockSignInMethod }))
  const { getByText } = renderAppWithStore();
  const signInButton = getByText(/click me to launch a rad signin workflow/i);
  signInButton.click();
  expect(mockSignInMethod).toHaveBeenCalledTimes(1);
  // expect(store.getState().user.isSignedIn).toBe(true);
  // const signOutButton = ;
  await waitFor(() => {
    expect(getByText(/sign out/i)).toBeInTheDocument();
  });
})


function renderAppWithStore() {
  return render(<Provider store={store}><App /></Provider>)
}

function mockGapi() {
  const mockGapi = {
    load: jest.fn(),
    auth2: {
      getAuthInstance: jest.fn()
    }

  };
  (global as any).gapi = mockGapi;
  return mockGapi;
}