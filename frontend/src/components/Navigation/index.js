import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Navbar } from "react-bulma-components";

import * as sessionActions from '../../store/session';

const Navigation = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);


    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        return history.push('/')
    };

    return (
        <Navbar style={{backgroundColor:"#EAE7DC"}} fixed="top" size="large">
            <Navbar.Brand>
                <Navbar.Item href="#" >
                    <h1 style={{fontSize:"45px", color:"#E85A4F"}}>R</h1>
                </Navbar.Item>
                <Navbar.Burger />
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container className="navbar-end" align="end">
                <Navbar.Item href="/discover">
                            Discover
                    </Navbar.Item>
                    <Navbar.Item href="/about-us">
                            About us
                    </Navbar.Item>
                    {sessionUser && (<Navbar.Item href={`/${sessionUser.username}`}>
                            Profile
                    </Navbar.Item>)}
                    {sessionUser && (<button id='logout' onClick={handleLogout}>Logout</button>)}
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    )
};

export default Navigation;