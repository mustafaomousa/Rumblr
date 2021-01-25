import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createNewLike } from '../../store/like';
import './post-card.css'

const PostCard = ({ post, user, idx }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userLikes = useSelector(state => state.likes.likes.filter(like => like.userId === sessionUser.id && like.postId === post.id));

    let like = null;
    if (userLikes.shift !== undefined) {
        like = userLikes.shift()
        // console.log(like)
    };
    // const { like } = userLikes.shift();

    const likePost = (e) => {
        e.preventDefault();
        setLiked(true);
        const userId = sessionUser.id;
        const postId = post.id;
        const payload = { userId, postId };

        dispatch(createNewLike(payload));
    };

    useEffect(() => {
        if (like) setLiked(true);
        console.log(liked)
    }, [])

    return (
        <div className='post-card' key={idx}>
            <div className='user-info-container'>
                <NavLink to={`/${post.User.username}`}>{post.User.username}</NavLink>
            </div>
            <>
                <h3>{post.title}</h3>
                <img src={post.content} alt='' />
                <p>{post.body}</p>
            </>
            <div className='post-info-container'>
                {liked && (
                    <button>Un-like</button>
                )}
                {!liked && (
                    <button onClick={likePost}>Like</button>
                )

                }
            </div>
        </div>

    )
};

export default PostCard;