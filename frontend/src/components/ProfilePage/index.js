import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './profile.css';

const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models);

    if (!sessionUser) return (
        <Redirect to='/welcome' />
    );

    return (
        <div className='profile-body'>
            <h1>Profile</h1>
            <CreatePost user={sessionUser} makes={makes} models={models} />
            {allPosts && allPosts.map((post, idx) => {
                if (post.userId === sessionUser.id) return <PostCard post={post} user={sessionUser} key={idx} />
            })}
        </div>
    )
};

export default ProfilePage;