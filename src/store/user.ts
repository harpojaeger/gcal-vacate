import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
import { thunkApiExtras } from './root';
import { signInListener } from '../client/gapi';

// An enum is used rather than a boolean, to account for the period before the
// gapi auth client loads, when we don't know if the user is signed in or not.
export enum UserSignInStatus {
    UNKNOWN = 0,
    SIGNED_IN = 1,
    SIGNED_OUT = 2,
}
export interface UserState {
    signInStatus: UserSignInStatus;
}

export const initialState: UserState = {
    signInStatus: UserSignInStatus.UNKNOWN,
};

export const requestSignIn = createAsyncThunk<
    void,
    void,
    { extra: thunkApiExtras }
>('user/requestSignIn', async (unused, { extra: { rpcClient } }) => {
    rpcClient.signIn();
});

export const requestSignOut = createAsyncThunk<
    void,
    void,
    { extra: thunkApiExtras }
>('user/requestSignOut', async (unused, { extra: { rpcClient } }) => {
    rpcClient.signOut();
});

export const updateSignInStatus = createAsyncThunk<
    boolean,
    void,
    { extra: thunkApiExtras }
>('user/updateSignInStatus', async (unused, { extra: { rpcClient } }) => {
    return rpcClient.getIsSignedIn();
});

export const setSignInListener = createAsyncThunk<
    void,
    signInListener,
    { extra: thunkApiExtras }
>('user/setSignInListener', async (listener, { extra: { rpcClient } }) => {
    rpcClient.setSignInListener(listener);
});

export const userReducer = createReducer(
    initialState,
    (builder: ActionReducerMapBuilder<UserState>) => {
        builder.addCase(
            updateSignInStatus.fulfilled,
            (state, { payload: isSignedIn }) => {
                if (isSignedIn) {
                    state.signInStatus = UserSignInStatus.SIGNED_IN;
                } else {
                    state.signInStatus = UserSignInStatus.SIGNED_OUT;
                }
            }
        );
    }
);
