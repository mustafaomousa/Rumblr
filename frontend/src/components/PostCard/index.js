import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';

import { createNewLike, deleteLike } from '../../store/like';
import './post-card.css'
import { createRerumble, removeRerumble } from '../../store/post';

const PostCard = ({ post, rerumbles }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [pictureIsOpen, setPictureIsOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const postLikes = useSelector(state => state.likes.likes.filter(like => like.postId === post.id));
    const userLikes = useSelector(state => state.likes.likes.filter(like => like.userId === sessionUser.id && like.postId === post.id));
    const rerumble = rerumbles.filter(rerumble => rerumble.userId === sessionUser.id && rerumble.postId === post.id)[0];




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

    const openSelectedPicture = (e) => {
        e.preventDefault();
        setPictureIsOpen(true);
    };


    const removeLike = (e) => {
        e.preventDefault();

        const userId = sessionUser.id;
        const postId = post.id;
        const payload = { userId, postId };

        dispatch(deleteLike(payload));
        setLiked(false);
    };

    const addRerumble = (e) => {
        e.preventDefault();

        const userId = sessionUser.id;
        const postId = post.id;
        const payload = { userId, postId };

        dispatch(createRerumble(payload));
    };

    const deleteRerumble = (e) => {
        e.preventDefault();

        const userId = sessionUser.id;
        const postId = post.id;
        const payload = { userId, postId }

        dispatch(removeRerumble(payload))
    };

    useEffect(() => {
        if (like) setLiked(true);
    }, [like])

    if (postLikes && sessionUser && userLikes) return (
        <>
            <FontAwesomeIcon onClick={openSelectedPicture} id={'magnify'} icon={faSearch} size={'3x'} />
            <Modal isOpen={pictureIsOpen} className='picture-modal'>
                <div className='image-modal-container'>
                    <FontAwesomeIcon onClick={() => setPictureIsOpen(false)} icon={faTimesCircle} size={'2x'} />
                    <img style={{ objectFit: 'fill', width: '600px', maxHeight: '1000px', position: 'relative', zIndex: '1000' }} src={post.content} alt=''></img>
                </div>
            </Modal>
            <div className={'post-card'}>
                <div className='post-title-container'>
                    <div className='user-post-link-container'>
                        <Link className='username' to={`/discover`} id='tag'>{post.title}</Link>
                    </div>
                    <div className='tools-control'>
                        <button>Like post</button>
                        <button>Rerumble post</button>
                        <button>Edit</button>
                    </div>
                    <div className={toolsOpen ? 'hidden' : 'tools'}>
                        <FontAwesomeIcon onClick={() => setToolsOpen(true)} icon={faChevronDown} size={'2x'} />
                    </div>
                    <div className={toolsOpen ? 'tools' : 'hidden'}>
                        <FontAwesomeIcon onClick={() => setToolsOpen(false)} icon={faChevronUp} size={'2x'} />
                    </div>
                </div>

                <div className='post-media'>
                    {post.content.includes('youtube') && (
                        <p>Video Player Here</p>
                        // <ReactPlayer width='450px' height='250px' url={post.content} />
                    )}
                    <img onClick={openSelectedPicture} class='post-image' src={post.content} alt=''></img >

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
                            {rerumble && <i onClick={deleteRerumble} className='fas fa-retweet rerumbled'></i>}
                            {!rerumble && <i onClick={addRerumble} className='fas fa-retweet'></i>}
                        </div>
                    )}
                    {!liked && (
                        <div className='user-control-buttons'>
                            <i onClick={likePost} id='heart' className="far fa-heart"></i>
                            {rerumble && <i onClick={deleteRerumble} className='fas fa-retweet rerumbled'></i>}
                            {!rerumble && <i onClick={addRerumble} className='fas fa-retweet not-rerumbled'></i>}
                        </div>
                    )}
                    <p id='like-count'>{postLikes.length} Rumbles</p>
                </div>
            </div>
        </>
    )

};

export default PostCard;