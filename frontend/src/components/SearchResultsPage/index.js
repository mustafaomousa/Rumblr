import { useEffect } from "react";
import { useSelector } from "react-redux";
import SinglePost from "../SinglePost";

import './search-result.css'

const SearchResultsPage = ({ posts, searchTerm }) => {
    const results = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const users = useSelector(state => state.session.allUsers);

    const searchedUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

    return posts && (
        <div >
            <div>
                <p>Posts:</p>
            </div>
            {results.map((post, idx) => (

                <div className='search-result-each' key={idx}>
                    <div className='divider' />
                    <a href='/' className='single-result'>{post.title}</a>
                </div>
            ))}
            <div>
                <p>Users:</p>
            </div>
            {users.map((user, idx) => (
                <div className='search-result-each' key={idx}>
                    <div className='divider' />
                    <a href='/' className='single-result'>{user.username}</a>
                </div>
            ))}
            <div>
                <p>Tags:</p>
            </div>
        </div>
    )
};

export default SearchResultsPage;