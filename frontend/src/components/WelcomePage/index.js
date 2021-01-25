import { useSelector } from 'react-redux';

import WelcomePostCard from '../WelcomePostCard';

import './welcome-page.css';

const WelcomePage = () => {

    const allPosts = useSelector(state => state.posts.allPosts)
    return (
        <div className='welcome-page-container'>
            <div>
                <h1>Welcome</h1>
            </div>
            <div className='sample'>
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