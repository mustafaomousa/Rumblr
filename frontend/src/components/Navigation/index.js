import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const Navigation = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
    };

    return (
        <div>
            {!sessionUser && (
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Sign up</NavLink>
                </>
            )
            }
            {sessionUser && (
                <>
                    <NavLink to='/'>Feed</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}

        </div >
    )
};

export default Navigation;