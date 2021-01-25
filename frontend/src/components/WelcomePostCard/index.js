import { useSelector } from 'react-redux';

const WelcomePostCard = ({ post, idx }) => {
    const postLikes = useSelector(state => state.likes.likes.filter(like => like.postId === post.id));

    return (
        <div className='post-card' key={idx}>
            <div className='user-info-container'>
                <a href='/'>{post.User.username}</a>
            </div>
            <>
                <h3>{post.title}</h3>
                <img src={post.content} alt='' />
                <p id='title'>{post.body}</p>
            </>
            <div className='post-info-container'>
                <button>Like</button>
                <p id='like-count'>{postLikes.length}</p>
            </div>
        </div>

    )
};

export default WelcomePostCard;