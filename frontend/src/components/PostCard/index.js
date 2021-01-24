import './post-card.css'

const PostCard = ({ post, idx }) => {
    return (
        <div className='post-card' key={idx}>
            <h3>{post.title}</h3>
            <img src={post.content} alt='' />
            <p>{post.body}</p>
        </div>
    )
};

export default PostCard;