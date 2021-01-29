import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './signup.css';

const SignupFormPage = () => {
    const history = useHistory();
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
        <Redirect to='/discover' />
    );

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);

            const payload = { email, username, header, bio, profilePicture, password };

            dispatch(sessionActions.signup(payload))
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                });

            return history.push('/discover')
        }
        return setErrors(['Confirm Password field must be the same as the Password'])

    };

    return (
        <div>
            <div className='errors'>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <form onSubmit={onSubmit}>
                <div className='sign-input-container'>
                    <div className='inputs'>
                        <div id='logo'>
                            <h2>R</h2>
                        </div>
                        <input type='text' onChange={updateUsername} value={username} placeholder='create a username' required />
                        <input type='text' onChange={updateEmail} value={email} placeholder='enter email' required />
                        <input type='text' onChange={updateHeader} value={header} placeholder='create a header' required />
                        <textarea onChange={updateBio} value={bio} placeholder='create a bio' required />
                        <input type='text' onChange={updateProfilePicture} value={profilePicture} placeholder='Upload profile picture' required />
                        <input type='password' onChange={updatedPassword} placeholder='create a password' required />
                        <input type='password' onChange={updatedConfirmPassword} placeholder='confirm password' required />
                    </div>
                    <button type='submit' id='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
};

export default SignupFormPage;