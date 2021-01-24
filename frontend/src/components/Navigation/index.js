import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './navigation.css';

const Navigation = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
    };

    return (
        <div className='nav-bar'>
            <div className='nav-buttons-container'>

                {sessionUser && (
                    <>
                        <NavLink to='/'>Feed</NavLink>
                    </>
                )}
            </div>
            <div className='profile-buttons-container'>
                {!sessionUser && (
                    <>
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/signup'>Sign up</NavLink>
                    </>
                )
                }
                {sessionUser && (
                    <>
                        <NavLink to='/profile'>Profile</NavLink>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>


        </div >
    )
};

export default Navigation;