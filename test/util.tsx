import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppState } from '../src/store/root';
import { EnhancedStore } from '@reduxjs/toolkit';
/**
 * Renders the app using the given Redux store.
 */
export function renderWithStore(component: JSX.Element, store: EnhancedStore<AppState>) {
    return render(<React.StrictMode><Provider store={store}>{component}</Provider></React.StrictMode>);
}
