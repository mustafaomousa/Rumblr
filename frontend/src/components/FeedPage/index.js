import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './feed.css';

const FeedPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models);
    const newestBlogs = useSelector(state => state.session.newestBlogs);

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    return (
        <div className='body'>
            <div className='update'>
                <div className='newest-blogs-container sticky'>
                    <div className='newest-blogs-header'>
                        <h4>Browse our newest blog's</h4>
                    </div>
                    <div className='newest-blogs'>
                        {newestBlogs && newestBlogs.map((blog, idx) => {
                            return (
                                <div className='newest-blog-box' key={idx}>
                                    <img className='profile-picture' src={blog.profilePicture} />
                                    <div className='profile-info'>
                                        <h3>{blog.username}</h3>
                                        <p>{blog.header}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='tag-day-container sticky'>
                    <h4>Tag of the day</h4>
                    <div className='tag-header'>
                        <h1>#expensive</h1>
                    </div>
                    <button id='tag-submit-button'>View related posts</button>
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