import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './navigation.css';

const Navigation = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const sessionUser = useSelector(state => state.session.user);

    const updateSearch = (e) => setSearch(e.target.value);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className='nav-bar'>
                <div className='nav-buttons-container'>
                    {sessionUser && (
                        <>
                            <NavLink to='/feed'>Feed</NavLink>
                            <input onChange={updateSearch} id='search' placeholder='search'></input>
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
            {
                search && (
                    <div className='search-results-container'>
                        <div className='post-results'>
                            <a href='/'>Search posts</a>
                        </div>
                        <div className='tag-results'>
                            <a href='/'>Search tags</a>
                        </div>
                        <div className='user-results'>
                            <a href='/'>Search users</a>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default Navigation;