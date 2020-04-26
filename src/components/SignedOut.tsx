import React from 'react'
import { useDispatch } from 'react-redux'
import { requestSignIn } from '../store/user';

export default () => {
    const dispatch = useDispatch();

    return (
        <div><button onClick={() => dispatch(requestSignIn())}>Click me to launch a rad signin workflow</button></div>
    );
}
