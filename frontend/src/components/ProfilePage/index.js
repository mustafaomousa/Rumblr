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

    const profileUser = useSelector(state => state.session.allUsers.filter((user) => user.username === username))[0];

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    if (username === sessionUser.username) return (

        <div className='main'>
            <div className='profile-card'>
                <div className='profile-user-info'>
                    <img id='profile-picture' src={profileUser.profilePicture}></img>
                    <h1>{sessionUser.username}</h1>
                </div>
                <div className='bio-header'>
                    <h4>{profileUser.header}</h4>
                    <p>{profileUser.bio}</p>
                </div>
            </div>
            <div className='profile-body'>

                {/* <CreatePost user={sessionUser} makes={makes} models={models} /> */}
                {allPosts && allPosts.map((post, idx) => {
                    if (post.userId === sessionUser.id) return (<PostCard post={post} user={sessionUser} key={idx} />)
                })}
            </div>
        </div>

    )

    return profileUser && (
        <div className='main'>
            <div className='profile-card'>
                <div className='profile-user-info'>
                    <img id='profile-picture' src={profileUser.profilePicture}></img>
                    <h1>{profileUser.username}</h1>
                </div>
                <div className='bio-header'>
                    <h4>{profileUser.header}</h4>
                    <p>{profileUser.bio}</p>
                </div>
            </div>
            <div className='profile-body'>
                {allPosts && allPosts.map((post, idx) => {
                    if (post.User.username === username) return (<PostCard post={post} user={sessionUser} key={idx} />)
                })}
            </div>
        </div>

    )
};

export default ProfilePage;