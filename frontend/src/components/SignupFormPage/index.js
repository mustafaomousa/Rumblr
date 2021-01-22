import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const updateUsername = (e) => setUsername(e.target.value);
    const updateEmail = (e) => setEmail(e.target.value);
    const updatedPassword = (e) => setPassword(e.target.value);
    const updatedConfirmPassword = (e) => setConfirmPassword(e.target.value);

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);

            const payload = { email, username, password };

            return dispatch(sessionActions.signup(payload))
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password'])

    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Username
                    <input type='text' onChange={updateUsername} value={username} placeholder='username/email' required />
                </label>
                <label>E-mail
                    <input type='text' onChange={updateEmail} value={email} placeholder='username/email' required />
                </label>
                <label>Password
                    <input type='password' onChange={updatedPassword} placeholder='password' required />
                </label>
                <label>Confirm Password
                    <input type='password' onChange={updatedConfirmPassword} placeholder='password' required />
                </label>
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
};

export default SignupFormPage;