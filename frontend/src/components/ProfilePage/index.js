import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { Container, Image, Section, Heading } from "react-bulma-components";

import CreatePost from '../CreatePost';
import PostCard from '../PostCard';
import './profile.css';

const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const allPosts = useSelector(state => state.posts.allPosts);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models);
    const { rerumbles } = useSelector(state => state.posts);

    let { username } = useParams();

    const profileUser = useSelector(state => state.session.allUsers.filter((user) => user.username === username))[0];
    let profileUserId = profileUser.id;
    const rerumbledPosts = useSelector(state => state.posts.rerumbles.filter(rerumble => rerumble.userId === profileUserId));

    useEffect(() => window.scrollTo(0, 0), [])

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    if (profileUser.username === sessionUser.username) return (
        <div className='ProfilePage'>
            <Section display="flex">
                <Container>
                    <Heading>
                        <Image size={96} src={profileUser.profilePicture} alt=''/>  
                    </Heading>
                    <Heading subtitle>
                        {sessionUser.username}
                    </Heading>
                </Container>
                <Container>
                    <Heading>
                        {profileUser.header}
                    </Heading>
                    <Heading subtitle>
                        {profileUser.bio}
                    </Heading>
                </Container>
            </Section>
            <Section className="columns">
                <Section className="column" display="flex" flexDirection="column" justifyItems="flex-end">
                    <Container>
                        {allPosts && rerumbles && allPosts.map((post, idx) => {
                            if (post.userId === sessionUser.id) return (<PostCard post={post} rerumbles={rerumbles} user={sessionUser} key={idx} />)
                        })}
                    </Container>
                </Section>
                <Section className="column" display="flex" flexDirection="column" justifyItems="flex-start">
                    <Container style={{width:"100%"}}>
                        <CreatePost user={sessionUser} makes={makes} models={models} />
                        <div className='rerumbled-container'>
                            <h2>{username}'s Rerumble's:</h2>
                            {rerumbledPosts && rerumbledPosts.map((post, idx) => {
                                return (<PostCard post={post.Post} rerumbles={rerumbles} user={sessionUser} key={idx} />)
                            })}
                        </div>
                    </Container>
                </Section>
            </Section>
        </div>

    )

    if (profileUser) return (
        <div className='main'>
            <div className='profile-card'>
                <div className='profile-user-info'>
                    <img id='profile-picture' alt='' src={profileUser.profilePicture}></img>
                    <h1>{profileUser.username}</h1>
                </div>
                <div className='bio-header'>
                    <h4>{profileUser.header}</h4>
                    <p>{profileUser.bio}</p>
                </div>
            </div>
            <div className='split-cont'>
                <div className='profile-body'>
                    {allPosts && allPosts.map((post, idx) => {
                        if (post.User.username === username) return (<PostCard post={post} rerumbles={rerumbles} user={sessionUser} key={idx} />)
                    })}
                </div>
                <div className='rerumbled'>
                    <div className='rerumbled-container'>
                        <h2>{username}'s Rerumble's:</h2>
                        {rerumbledPosts && rerumbledPosts.map((post, idx) => {
                            return (<PostCard post={post.Post} rerumbles={rerumbles} user={sessionUser} key={idx} />)
                        })}
                    </div>
                </div>
            </div>

        </div>

    )

    return <h1>Loading</h1>
};

export default ProfilePage;