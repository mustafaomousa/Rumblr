import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './profile.css';

const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models);

    let { username } = useParams();

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    if (username === sessionUser.username) return (
        <div className='profile-body'>
            <h1>Profile</h1>
            <CreatePost user={sessionUser} makes={makes} models={models} />
            {allPosts && allPosts.map((post, idx) => {
                if (post.userId === sessionUser.id) return (<PostCard post={post} user={sessionUser} key={idx} />)
            })}
        </div>
    )

    return (
        <div className='profile-body'>
            <h1>{username}'s profile</h1>
            {allPosts && allPosts.map((post, idx) => {
                if (post.User.username === username) return (<PostCard post={post} user={sessionUser} key={idx} />)
            })}
        </div>
    )
};

export default ProfilePage;