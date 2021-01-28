import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import ReactPlayer from 'react-player'

import { createNewLike, deleteLike } from '../../store/like';
import './post-card.css'

const PostCard = ({ post }) => {
    const history = useHistory();
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

    let listOfTags = [];
    if (post.Tags) {
        for (let i = 0; i < post.Tags.length; i++) {
            listOfTags.push(post.Tags[i].name)
        }
    }


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

    return postLikes && (
        <div className={'post-card'}>
            <div className='post-title-container'>
                <div className='user-icon-container'>
                    {/* <img id='user-icon' src={post.User.profilePicture}></img> */}
                </div>
                <div className='user-post-link-container'>
                    <Link className='username' to={`/${post.User.username}`} id='tag'>{post.title}</Link>
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
                <Link className='username' to={`/${post.User.username}`}>{post.User.username}:</Link>
                <p>{post.body.split(' ').map((string, index) => {
                    if (listOfTags.includes(string)) {
                        return <Link key={index} to={`/tag/${string.replace('#', '')}`}>{` ${string}`}</Link>
                    } else {
                        return ` ${string}`
                    }
                })}</p>
            </div>
            <div className='user-control-panel'>
                {liked && (
                    <div className='user-control-buttons'>
                        <i onClick={removeLike} id='heart' className="far fa-heart selected"></i>
                        <i className='fas fa-retweet'></i>
                    </div>
                )}
                {!liked && (
                    <div className='user-control-buttons'>
                        <i onClick={likePost} id='heart' className="far fa-heart"></i>
                        <i className='fas fa-retweet'></i>
                    </div>
                )}
                <p id='like-count'>{postLikes.length} Rumbles</p>
            </div>
        </div>
    )
};

export default PostCard;