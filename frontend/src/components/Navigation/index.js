import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AccountModal from '../AccountModal';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


import SearchResultsPage from '../SearchResultsPage';
import * as sessionActions from '../../store/session';

import './navigation.css';
import SideNavigation from '../SideNavigation';

const Navigation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [accountIsOpen, setAccountIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts)
    const [sideOpen, setSideOpen] = useState('false')

    const updateSearch = (e) => setSearch(e.target.value);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        return history.push('/')
    };

    return (
        <div className='nav-bar-holder'>
            <SideNavigation sideOpen={sideOpen} />
            <div className='nav-bar'>
                <div className='nav-buttons-container'>
                    {sessionUser && (
                        <>
                            <div className='search-container'>
                                <FontAwesomeIcon onClick={() => setSideOpen(!sideOpen)} icon={faBars} size={'2x'} className={sideOpen ? 'fa fa-bars' : 'fa fa-bars open'} />
                                <input onChange={updateSearch} id='search' placeholder='search'></input>
                            </div>

                        </>
                    )}
                </div>
                <div className={'nav-logo-container'}>
                    <h2 onClick={() => history.push('/discover')}>Rumblr</h2>
                </div>
                <div className='profile-buttons-container'>
                    {sessionUser && (
                        <>
                            <i onClick={() => setAccountIsOpen(!accountIsOpen)} id='profile-icon' className='fas fa-id-card'></i>
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
            {sessionUser && <Modal animationType='fade' className={'ReactModal__Content'} isOpen={accountIsOpen}>
                <FontAwesomeIcon onClick={() => setAccountIsOpen(false)} icon={faTimesCircle} size={'2x'} id='close-button' />

                <AccountModal sessionUser={sessionUser}></AccountModal>
            </Modal>}
        </div>
    )
};

export default Navigation;