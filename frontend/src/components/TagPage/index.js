import { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getRecentTagPosts } from '../../store/post';

import './tag-page.css';
import { useEffect } from "react";
import PostCard from "../PostCard";

const TagPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const [toggle, setToggle] = useState(false);

    const { tagPosts } = useSelector(state => state.posts);
    const searchedTag = location.pathname.match(/[^\/]*$/)[0]

    useEffect(() => {
        dispatch(getRecentTagPosts(searchedTag));
    }, [dispatch])

    return (
        <div className='tag'>
            <div className='tag-box'>
                <div className='tag-box-header'>

                    <div className='tag-box-control'>
                        <div className='selector recent'>
                            <h4 onClick={() => setToggle(false)} className={toggle ? '' : 'active'}>Recent</h4>
                        </div>
                        <div className='selector top'>
                            <h4 onClick={() => setToggle(true)} className={toggle ? 'active' : ''}>Top</h4>
                        </div>
                    </div>
                </div>
                <div className='tag-cards'>
                    {tagPosts && tagPosts.map((post) => <PostCard post={post} />)}
                </div>
            </div>
            <div className='side-box'>
                <div className='searched-tag-info'>
                    <h1>' #{searchedTag} '</h1>
                </div>
            </div>
        </div>
    )
};

export default TagPage;