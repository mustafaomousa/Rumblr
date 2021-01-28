import { useSelector } from "react-redux";

import './search-result.css'

const SearchResultsPage = ({ posts, searchTerm }) => {
    const results = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const users = useSelector(state => state.session.allUsers);
    const tags = useSelector(state => state.posts.tags.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase())))

    return posts && tags && (
        <div >
            <div>
                <p>Posts:</p>
            </div>
            {results.map((post, idx) => (

                <div className='search-result-each' key={idx}>
                    <div className='search-divider' />
                    <a href='/' className='single-result'>{post.title}</a>
                </div>
            ))}
            <div>
                <p>Users:</p>
            </div>
            {users.map((user, idx) => (
                <div className='search-result-each' key={idx}>
                    <div className='search-divider' />
                    <a href={`/${user.username}`} className='single-result'>{user.username}</a>
                </div>
            ))}
            <div>
                <p>Tags:</p>
            </div>
            {tags.map((tag, idx) => (
                <div className='search-result-each' key={idx}>
                    <div className='search-divider' />
                    <a href={`/tag/${tag.name.substring(1)}`} className='single-result'>{tag.name}</a>
                </div>
            ))}
        </div>
    )
};

export default SearchResultsPage;