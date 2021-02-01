import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCompass, faQuestion } from '@fortawesome/free-solid-svg-icons'

import './side-navigation.css'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SideNavigation = ({ sideOpen }) => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return (
        <div className={sideOpen ? 'side-navigation-container-closed' : 'side-navigation-container'}>
            <NavLink className={sideOpen ? 'hidden-side' : ''} to={`/${sessionUser.username}`}>
                <FontAwesomeIcon icon={faUser} size={'2x'} />
            </NavLink>
            <NavLink className={sideOpen ? 'hidden-side' : ''} to='/discover'>
                <FontAwesomeIcon icon={faCompass} size={'2x'} />
            </NavLink>
            <NavLink className={sideOpen ? 'hidden-side' : ''} to='/about-us'>
                <FontAwesomeIcon icon={faQuestion} size={'2x'} />
            </NavLink>
        </div>
    )

    if (!sessionUser) return (<div></div>)
};

export default SideNavigation