import { useSelector } from "react-redux";

import PostCard from "../PostCard";

const AllPostsComponent = () => {
    const allPosts = useSelector(state => state.posts.allPosts);
    const rerumbles = useSelector(state => state.posts.rerumbles);
    const sessionUser = useSelector(state => state.session.user);
    
    return (
        allPosts && allPosts.map((post, idx) => {
            return (<PostCard post={post} rerumbles={rerumbles} user={sessionUser} key={idx} />)
        })
    )
};

export default AllPostsComponent;