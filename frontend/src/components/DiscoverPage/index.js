import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { getAllUsers, getAllNewestUsers } from '../../store/session';
import { getPosts, getRerumbles, getTags } from '../../store/post';
import { getLikes } from '../../store/like'

import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './feed.css';

const FeedPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models);
    const newestBlogs = useSelector(state => state.session.newestBlogs);
    const rerumbles = useSelector(state => state.posts.rerumbles);
    const [count, setCount] = useState(3);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getLikes());
        dispatch(getAllNewestUsers());
        dispatch(getTags());;
        dispatch(getRerumbles());;
    }, [dispatch])

    useEffect(() => window.scrollTo(0, 0), [])

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    const loadMorePosts = (e) => {
        e.preventDefault();
        if (allPosts.length < count) {
            return alert("no new posts")
        }
        setCount(count + 5)
    };

    if (sessionUser && allPosts && makes && models && newestBlogs) return (
        <div className='body'>
            <div className='left-side'>
                <div className='update'>
                    <div className='newest-blogs-container sticky'>
                        <div className='newest-blogs-header'>
                            <h4>Browse our newest blog's</h4>
                        </div>
                        <div className='newest-blogs'>
                            {newestBlogs && newestBlogs.map((blog, idx) => {
                                return (
                                    <div className='newest-blog-box' key={idx}>
                                        <img className='profile-picture' alt='' src={blog.profilePicture} />
                                        <div className='profile-info'>
                                            <a href={`/${blog.username}`}><h3>{blog.username}</h3></a>
                                            <p>{blog.header}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
                <div className='tag-day sticky'>
                    <div className='tag-day-container sticky'>
                        <h4>Tag of the day</h4>
                        <div className='tag-header'>
                            <h1>#expensive</h1>
                        </div>
                        <button onClick={() => history.push('/tag/expensive')} id='tag-submit-button'>View related posts</button>
                    </div>
                </div>
            </div>
            <div className='feed-body'>
                <h1 style={{ textDecoration: 'underline', textUnderlineOffset: '5px', textUnderlinePosition: 'right' }}>Discover</h1>
                <CreatePost user={sessionUser} makes={makes} models={models} />
                <button id='tag-submit-button' onClick={() => dispatch(getPosts())}>Load newest</button>
                {allPosts && allPosts.map((post, idx) => {
                    if (idx < count) return (<PostCard post={post} rerumbles={rerumbles} user={sessionUser} key={idx} />)

                    return
                })}
                <div className='load-more'>
                    {allPosts.length > count && (<button id='tag-submit-button' onClick={loadMorePosts}>Load more</button>)}
                </div>
            </div >
        </div>
    )

    return (<h1>Loading</h1>)

};

export default FeedPage;