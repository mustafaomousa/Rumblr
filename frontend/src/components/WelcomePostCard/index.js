import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player'

import { createNewLike, deleteLike } from '../../store/like';
import './welcome.css'

const WelcomePostCard = ({ post }) => {


    let listOfTags = [];

    return (
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
                <div className='user-control-buttons'>
                    <i id='heart' className="far fa-heart selected"></i>
                    <i className='fas fa-retweet'></i>
                </div>
                <p id='like-count'> Rumbles</p>
            </div>
        </div>
    )
};

export default WelcomePostCard;