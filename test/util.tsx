import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { Provider } from 'react-redux';
import { AppState } from '../src/store/root';
import { EnhancedStore } from '@reduxjs/toolkit';
/**
 * Renders the app using a mocked GAPI RPC class.
 */
export function renderApp(store: EnhancedStore<AppState>) {
    return render(<React.StrictMode><Provider store={store}><App /></Provider></React.StrictMode>);
}
