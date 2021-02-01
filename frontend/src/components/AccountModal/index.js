
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/session';
import './account.css'



const AccountModal = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.allUsers.find(user => user.username === sessionUser.username))

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className='account-container'>
            <div className='account-container-header'>
                <img id='picture' alt='' src={user.profilePicture}></img>
            </div>
            <div className='account-container-body'>
                <p>Header: </p>
                <h4>{user.header}</h4>
                <div id='account-divider' />
                <p>Bio: </p>
                <h4>{user.bio}</h4>
                <div id='account-divider' />
                <p>Username:</p>
                <h4>{user.username}</h4>
            </div>
            <div className='account-container-footer'>
                <button>Change Password</button>
                <button>Change e-mail</button>
                <button>Delete Account</button>
            </div>
        </div>
    )
};

export default AccountModal;