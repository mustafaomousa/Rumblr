import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Section, Container, Image, Box, Media, Content, Heading, Button } from "react-bulma-components";

import { getAllUsers, getAllNewestUsers } from '../../store/session';
import { getPosts, getRerumbles, getTags } from '../../store/post';
import { getLikes } from '../../store/like'

import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './feed.css';

const FeedPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models);
    const newestBlogs = useSelector(state => state.session.newestBlogs);
    const rerumbles = useSelector(state => state.posts.rerumbles);
    const [count, setCount] = useState(3);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getLikes());
        dispatch(getAllNewestUsers());
        dispatch(getTags());;
        dispatch(getRerumbles());;
    }, [dispatch])

    useEffect(() => window.scrollTo(0, 0), [])

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    const loadMorePosts = (e) => {
        e.preventDefault();
        if (allPosts.length < count) {
            return alert("no new posts")
        }
        setCount(count + 5)
    };

    if (sessionUser && allPosts && makes && models && newestBlogs) return (
        <div className='DiscoverPage columns'>
            <div className='column'>
                <Section>
                    <Section>
                        <Container className="NewestBlogsContainer">
                            <Heading>
                                Browse our newest blog's
                            </Heading>
                            {newestBlogs && newestBlogs.map((blog, idx) => {
                                return (
                                    <Section key={idx}>
                                        <Box>
                                            <Media renderAs="article">
                                                <Media.Item align="left">
                                                    <Image size={64} src={blog.profilePicture}/>    
                                                </Media.Item>
                                                <Media.Item align="center">
                                                    <Content>
                                                        <p>
                                                            <strong>{blog.username}</strong>
                                                            <br />
                                                            {blog.header}
                                                        </p>
                                                    </Content>
                                                </Media.Item>
                                            </Media>
                                        </Box>
                                    </Section>
                                )
                            })}
                        </Container>
                    </Section>
                    <Section>
                        <Container className="TagDayContainer">
                            <Heading>
                                Tag of the day
                            </Heading>
                            <Heading subtitle>
                                #expensive
                            </Heading>
                            <Button onClick={() => history.push('/tag/expensive')}>Browse</Button>
                        </Container>
                    </Section>
                </Section>
            </div>
            <div className='column'>
                <Heading>
                    Discover
                </Heading>
                <CreatePost user={sessionUser} makes={makes} models={models} />
                {allPosts && allPosts.map((post, idx) => {
                    if (idx < count) return (<PostCard post={post} rerumbles={rerumbles} user={sessionUser} key={idx} />)

                    return
                })}
            </div>
        </div>
    )

    return (<h1>Loading...</h1>)

};

export default FeedPage;