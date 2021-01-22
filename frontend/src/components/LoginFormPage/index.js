import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const updateCredential = (e) => setCredential(e.target.value);
    const updatedPassword = (e) => setPassword(e.target.value);

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(res => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            })
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Username/email
                    <input type='text' onChange={updateCredential} value={credential} placeholder='username/email' required />
                </label>
                <label>Password
                    <input type='password' onChange={updatedPassword} placeholder='password' required />
                </label>
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
};

export default LoginFormPage;