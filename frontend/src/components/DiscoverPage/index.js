import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Section, Container, Heading, Button } from "react-bulma-components";

import { getAllUsers, getAllNewestUsers } from '../../store/session';
import { getRerumbles, getTags } from '../../store/post';
import { getLikes } from '../../store/like'
import CreatePost from '../CreatePost';
import NewestPostsComponent from '../NewestPostsComponent';
import AllPostsComponent from '../AllPostsComponent';

import './index.css';

const FeedPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const makes = useSelector(state => state.vehicles.makes);
    const models = useSelector(state => state.vehicles.models);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getLikes());
        dispatch(getAllNewestUsers());
        dispatch(getTags());;
        dispatch(getRerumbles());;
    }, [dispatch])

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    if (sessionUser && makes && models) return (
        <div className='DiscoverPage columns'>
            <div className='column'>
                <Section>
                    <Section>
                        <Container className="NewestBlogsContainer">
                            <Heading>
                                Browse our newest blog's
                            </Heading>
                            <NewestPostsComponent />
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
                <Section>
                    <Section>
                        <Heading>
                            Discover
                        </Heading>       
                    </Section>
                    <Section>
                        <CreatePost user={sessionUser} makes={makes} models={models} />    
                    </Section>
                    <Section>
                        <AllPostsComponent />    
                    </Section>
                </Section>
            </div>
        </div>
    )

    return (<h1>Loading...</h1>)

};

export default FeedPage;