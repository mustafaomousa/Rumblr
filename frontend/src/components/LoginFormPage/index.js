import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';

import './login.css';

import * as sessionActions from '../../store/session';

const LoginFormPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const updateCredential = (e) => setCredential(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);

    if (sessionUser) return (
        <Redirect to='/discover' />
    );

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(sessionActions.login(credential, password))
            .catch(res => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
                alert(res.data.errors)
            })

        return history.push('/discover')
    };

    const demoLogin = async (e) => {
        e.preventDefault();
        setErrors([]);
        let demoCredential = "demo-user";
        let demoPassword = "password";
        dispatch(sessionActions.login(demoCredential, demoPassword))
            .catch(res => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
                alert(res.data.errors)
            })

        return history.push('/discover')

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='input-container'>
                    <div className='errors'>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                    <label id='label'>Username/email</label>
                    <input id='input' type='text' onChange={updateCredential} value={credential} placeholder='username/email' required />
                    <label id='label'>Password</label>
                    <input id='input' type='password' onChange={updatePassword} value={password} placeholder='password' required />
                    <div id='submit-container'>
                        <button type='submit' id='submit'>Log in</button>
                        <button onClick={demoLogin} id='submit'>Demo</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default LoginFormPage;