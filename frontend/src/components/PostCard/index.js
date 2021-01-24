import { NavLink } from 'react-router-dom';
import './post-card.css'

const PostCard = ({ post, user, idx }) => {
    return (
        <div className='post-card' key={idx}>
            <div className='user-info-container'>
                <NavLink to={`/${post.User.username}`}>{post.User.username}</NavLink>
            </div>
            <h3>{post.title}</h3>
            <img src={post.content} alt='' />
            <p>{post.body}</p>
        </div>

    )
};

export default PostCard;