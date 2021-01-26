import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player'

import { createNewLike, deleteLike } from '../../store/like';
import './single-post.css'

const SinglePost = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const postLikes = useSelector(state => state.likes.likes.filter(like => like.postId === post.id));
    const userLikes = useSelector(state => state.likes.likes.filter(like => like.userId === sessionUser.id && like.postId === post.id));

    let like = null;
    if (userLikes.shift !== undefined) {
        like = userLikes.shift()
    };


    const likePost = (e) => {
        e.preventDefault();
        setLiked(true);
        const userId = sessionUser.id;
        const postId = post.id;
        const payload = { userId, postId };

        dispatch(createNewLike(payload));
    };

    const removeLike = (e) => {
        e.preventDefault();

        const userId = sessionUser.id;
        const postId = post.id;
        const payload = { userId, postId };

        dispatch(deleteLike(payload));
        setLiked(false);
    };

    useEffect(() => {
        if (like) setLiked(true);
    }, [like])

    return (
        <div className={'single-post-card'}>
            <div className='post-title-container'>
                <div className='user-icon-container'>
                    <img id='user-icon' src={post.User.profilePicture}></img>
                </div>
                <div className='user-post-link-container'>
                    <Link to={`/${post.User.username}`}>{post.title}</Link>
                </div>
            </div>
            <div className='post-media'>
                {post.content.includes('youtube') && (
                    <p>Video Player Here</p>
                    // <ReactPlayer width='450px' height='250px' url={post.content} />
                )}
                <img src={post.content} alt='' />
            </div>
            <div className='post-body'>
                <Link to={`/${post.User.username}`}>{post.User.username}:</Link>
                <p id='title'>{post.body}</p>
            </div>
            <div className='user-control-panel'>
                {liked && (
                    <>
                        <i onClick={removeLike} id='heart' className="far fa-heart selected"></i>
                    </>
                )}
                {!liked && (
                    <>
                        <i onClick={likePost} id='heart' className="far fa-heart"></i>
                    </>
                )}
                <p id='like-count'>{postLikes.length} likes</p>
            </div>
        </div>
    )
};

export default SinglePost;