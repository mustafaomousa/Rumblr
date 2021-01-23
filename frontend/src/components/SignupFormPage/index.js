import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [header, setHeader] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const updateUsername = (e) => setUsername(e.target.value);
    const updateEmail = (e) => setEmail(e.target.value);
    const updateHeader = (e) => setHeader(e.target.value);
    const updateBio = (e) => setBio(e.target.value);
    const updateProfilePicture = (e) => setProfilePicture(e.target.value);
    const updatedPassword = (e) => setPassword(e.target.value);
    const updatedConfirmPassword = (e) => setConfirmPassword(e.target.value);

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);

            const payload = { email, username, header, bio, profilePicture, password };

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
                <label>Header
                    <input type='text' onChange={updateHeader} value={header} placeholder='header' required />
                </label>
                <label>Bio
                    <textarea onChange={updateBio} value={bio} placeholder='bio' required />
                </label>
                <label>Profile Picture URL
                    <input type='text' onChange={updateProfilePicture} value={profilePicture} placeholder='Profile Picture' required />
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