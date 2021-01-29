import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCompass, faQuestion } from '@fortawesome/free-solid-svg-icons'

import './side-navigation.css'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SideNavigation = ({ sideOpen }) => {
    const sessionUser = useSelector(state => state.session.user)

    return sessionUser && (
        <div className={sideOpen ? 'hidden-side' : 'side-navigation-container'}>
            <NavLink to={`/${sessionUser.username}`}>
                <FontAwesomeIcon icon={faUser} size={'2x'} />
            </NavLink>
            <NavLink to='/discover'>
                <FontAwesomeIcon icon={faCompass} size={'2x'} />
            </NavLink>
            <NavLink to='/about-us'>
                <FontAwesomeIcon icon={faQuestion} size={'2x'} />
            </NavLink>
        </div>
    )
};

export default SideNavigation