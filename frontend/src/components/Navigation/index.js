import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import SearchResultsPage from '../SearchResultsPage';
import * as sessionActions from '../../store/session';

import './navigation.css';

const Navigation = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts)

    const updateSearch = (e) => setSearch(e.target.value);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        return (<Redirect to='/' />)
    };

    return (
        <>
            <div className='nav-bar'>
                <div className='nav-buttons-container'>
                    {sessionUser && (
                        <>
                            <div className='buttons-container'>
                                <NavLink to='/feed'>Feed</NavLink>
                                <NavLink to={`/${sessionUser.username}`}>Profile</NavLink>
                            </div>
                            <div className='search-container'>
                                <input onChange={updateSearch} id='search' placeholder='search'></input>
                            </div>

                        </>
                    )}
                </div>
                <div className={'nav-logo-container'}>
                    <h2>Rumblr</h2>
                </div>
                <div className='profile-buttons-container'>
                    {sessionUser && (
                        <>
                            <button id='logout' onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>

            </div >
            <div className='divider shown' />
            {search && (
                <div className='search-results-container'>
                    <SearchResultsPage searchTerm={search} posts={allPosts} />
                </div>
            )}
        </>
    )
};

export default Navigation;