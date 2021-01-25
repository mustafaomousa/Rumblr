import { useEffect } from "react";

import './search-result.css'

const SearchResultsPage = ({ posts, searchTerm }) => {
    const results = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => { console.log(results) }, [searchTerm, results])
    return posts && (
        <div >
            {results.map((post, idx) => (

                <div className='search-result-each' key={idx}>
                    <div className='divider' />
                    <a className='single-result' href={`/${post.User.username}/${post.id}`}>{post.title}</a>
                </div>
            ))}
        </div>
    )
};

export default SearchResultsPage;