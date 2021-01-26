import { useState } from 'react';
import { useSelector } from 'react-redux';

import WelcomePostCard from '../WelcomePostCard';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

import './welcome-page.css';

const WelcomePage = () => {
    const [switcher, setSwitcher] = useState(false);
    const allPosts = useSelector(state => state.posts.allPosts);
    return (
        <div className='welcome-page-container'>
            <div className='blur'>
            </div>
            <div className='sample'>
                <div className='user-controls'>
                    <div className='input-fields'>
                        <div className={switcher ? 'hidden' : 'active'}>
                            <LoginFormPage />
                        </div>
                        <div className={switcher ? 'active' : 'hidden'}>
                            <SignupFormPage />
                        </div>
                    </div>
                    <div className='user-buttons'>
                        <button id={switcher ? 'hidden' : 'active'} onClick={e => setSwitcher(false)}>Log in</button>
                        <button id={switcher ? 'active' : 'hidden'} onClick={e => setSwitcher(true)}>Sign Up</button>
                    </div>
                </div>
                {allPosts && allPosts.map((post, idx) => {
                    return idx <= 9 && (
                        <WelcomePostCard post={post} key={idx} />
                    )
                })}
            </div>
        </div>
    )
};

export default WelcomePage;