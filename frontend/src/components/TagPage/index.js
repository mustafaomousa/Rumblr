import { useHistory, useLocation } from "react-router-dom";

import './tag-page.css';

const TagPage = () => {
    const history = useHistory();
    const location = useLocation();

    const searchedTag = location.pathname.match(/[^\/]*$/)[0]
    console.log(searchedTag)
    return (
        <div className='tag'>
            <div className='tag-box'>
                <div className='tag-box-header'>

                    <div className='tag-box-control'>
                        <div className='selector recent'>
                            <a >Recent</a>
                        </div>
                        <div className='selector top'>
                            <a >Top</a>
                        </div>
                    </div>
                </div>
                <div className='tag-cards'>
                    Render tag posts here
                </div>
            </div>
            <div>
                <div className='searched-tag-info'>
                    <h1>' #{searchedTag} '</h1>
                </div>
            </div>
        </div>
    )
};

export default TagPage;