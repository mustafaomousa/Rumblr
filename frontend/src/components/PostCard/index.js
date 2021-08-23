import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Media, Image, Heading, Content, Tag, Container } from "react-bulma-components";

import { createNewLike, deleteLike } from '../../store/like';
import { createRerumble, deletePost, removeRerumble, updatePost } from '../../store/post';

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

    const [updateOpen, setUpdateOpen] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    const onUpdate = (e) => {
        e.preventDefault();

        const tags = body.match(/#[A-Za-z0-9]*/g)

        const payload = {
            tags,
            postId: post.id,
            title,
            body,
        };
        dispatch(updatePost(payload));
        setUpdateOpen(false);
    };

    useEffect(() => {
        if (like) setLiked(true);
    }, [like])

  return (
      <Card>
            <Card.Image size="4by3" src={post.content} />
            <Card.Content>
                <Media>
                    <Media.Item renderAs="figure" align="left">
                        <Image size={64} src={post.User.profilePicture} alt="64x64" />
                    </Media.Item>
                    <Media.Item>
                        <Heading size={4}>{post.User.username}</Heading>
                    </Media.Item>
                </Media>
                <Content>{post.body}</Content>
                <div display="grid" style={{display:"grid", gap:"1px", gridAutoFlow:"column"}}>
                        <Tag.Group hasAddons paddingless marginless>
                            <Tag onClick={likePost}>
                                Like
                            </Tag>
                            <Tag>
                                {userLikes.length}
                            </Tag>
                        </Tag.Group>
                        <Tag.Group hasAddons paddingless marginless>
                            <Tag onClick={addRerumble}>
                                Rerumble
                            </Tag>
                            <Tag>
                                {rerumbles.length}
                            </Tag>
                        </Tag.Group>    
                    </div>
            </Card.Content>
      </Card>
      
  )

};

export default PostCard;