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
                    <div className='searched-tag-info'>
                        <h1>'#{searchedTag}'</h1>
                    </div>
                    <div className='tag-box-control'>
                        <a>Recent</a>
                        <a>Top</a>
                    </div>
                </div>
                <div>
                    Render tag posts here
                </div>
            </div>
            <div>
                top posts component here
            </div>
        </div>
    )
};

export default TagPage;