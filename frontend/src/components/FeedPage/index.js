import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewPost, getPosts } from '../../store/post';

const FeedPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getPosts());

    }, [dispatch])

    const allPosts = useSelector(state => state.session.posts)

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
        <>
            <h1>FEED</h1>
            <button onClick={createTestPost}>Test create post</button>
        </>
    )

};

export default FeedPage;