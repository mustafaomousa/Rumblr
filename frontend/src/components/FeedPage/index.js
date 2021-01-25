import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewPost } from '../../store/post';
import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './feed.css';

const FeedPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models)

    if (!sessionUser) return (
        <Redirect to='/' />
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

    return (
        <div className='feed-body'>
            <h1>Feed</h1>
            <CreatePost user={sessionUser} makes={makes} models={models} />
            {allPosts && allPosts.map((post, idx) => {
                return <PostCard post={post} user={sessionUser} key={idx} />
            })}
            <button onClick={createTestPost}>Test create post</button>
        </div >
    )

};

export default FeedPage;