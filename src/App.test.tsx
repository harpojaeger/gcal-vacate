import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/root';

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
  const mockGapiObject: any = mockGapi();
  var mockSignInStatusListener: Function = jest.fn();
  const mockSignInStatusGetter = () => true;
  mockGapiObject.auth2.getAuthInstance.mockImplementation(() => ({
    isSignedIn: {
      listen: (handlerFn: Function) => { mockSignInStatusListener = handlerFn },
      get: mockSignInStatusGetter
    },
    signIn: () => mockSignInStatusListener(true)
  }));

  const store = createStore(rootReducer, {});
  const { getByText } = render(<Provider store={store}><App /></Provider>)
  const signInButton = getByText(/click me to launch a rad signin workflow/i);
  signInButton.click();

  await waitFor(() => {
    expect(getByText(/Click me to sign out/i)).toBeInTheDocument();
  });
})

function Wrapper({ children }: { children: any }) {
  return <React.StrictMode><Provider store={store}>{children}</Provider></React.StrictMode >
}

function renderAppWithStore() {
  return customRender(<App />, {});
}

const customRender = (ui: any, options: any) => render(ui, { wrapper: Wrapper, ...options })


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
