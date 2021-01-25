import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player'

import { createNewLike, deleteLike } from '../../store/like';
import './post-card.css'

const PostCard = ({ post, user, idx }) => {
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
        console.log(liked)
    }, [])

    return (
        <div className={'post-card'} key={idx}>
            <div className='user-info-container'>
                <NavLink to={`/${post.User.username}`}>{post.User.username}</NavLink>
            </div>
            <>
                <h3>{post.title}</h3>
                {post.content.includes('youtube') && (
                    <ReactPlayer width='450px' height='250px' url={post.content} />
                )}
                <img src={post.content} alt='' />
                <p id='title'>{post.body}</p>
            </>
            <div className='post-info-container'>
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
                <p id='like-count'>{postLikes.length}</p>
            </div>
        </div>

    )
};

export default PostCard;