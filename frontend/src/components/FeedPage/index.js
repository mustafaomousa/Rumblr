import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewPost } from '../../store/post';

import './feed.css';

const FeedPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);

    if (!sessionUser) return (
        <Redirect to='/welcome' />
    );

    const createTestPost = (e) => {
        e.preventDefault();

        const title = 'test title';
        const content = 'test content';
        const body = 'test body ody ody ody';
        const makeId = 1;
        const modelId = 1;
        const userId = 1;

        const payload = {
            title,
            content,
            body,
            makeId,
            modelId,
            userId
        };

        dispatch(createNewPost(payload));

    };

    console.log(allPosts)
    return (
        <div className='feed-body'>
            <h1>FEED</h1>
            {allPosts && allPosts.map((post, idx) => {
                return (
                    <div className='post-card' key={idx}>
                        <h3>{post.title}</h3>
                        <img src={post.content} alt='' />
                        <p>{post.body}</p>
                    </div>
                )
            })}
            <button onClick={createTestPost}>Test create post</button>
        </div >
    )

};

export default FeedPage;