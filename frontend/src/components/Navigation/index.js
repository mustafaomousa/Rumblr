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
                        <NavLink to='/feed'>Feed</NavLink>
                    </>
                )}
            </div>
            <div className='nav-logo-container'>
                <h2>Rumblr</h2>
            </div>
            <div className='profile-buttons-container'>
                {sessionUser && (
                    <>
                        <NavLink to='/profile'>Profile</NavLink>
                        <button id='logout' onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>


        </div >
    )
};

export default Navigation;