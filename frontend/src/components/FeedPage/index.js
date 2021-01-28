import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './feed.css';

const FeedPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models)

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    return (
        <div className='body'>
            <div className='update'>
                <div className='newest-blogs-container'>
                    <h4>Browse our newest blog's</h4>
                    <div className='newest-blogs'>

                    </div>
                </div>
            </div>
            <div className='feed-body'>
                <h1>Feed</h1>
                <CreatePost user={sessionUser} makes={makes} models={models} />
                {allPosts && allPosts.map((post, idx) => {
                    return <PostCard post={post} user={sessionUser} key={idx} />
                })}
            </div >
        </div>
    )

};

export default FeedPage;