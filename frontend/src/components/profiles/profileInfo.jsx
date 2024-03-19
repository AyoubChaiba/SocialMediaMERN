import { Link } from 'react-router-dom';
import './profileInfo.scss'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { AXIOS_CLIENT } from '../../lib/api/axios';
import { addfollow, removefollow } from '../../toolkit/userSlice';
import { toast } from 'react-toastify';

const ProfileInfo = ({ profile, postLength, user }) => {

    const dispatch = useDispatch()

    const FollowUser = async () => {
        try {
            const response = await AXIOS_CLIENT.post(`/users/follow/${profile.id}`);
            toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            dispatch(addfollow({
                id : profile.id,
                username : profile.username,
                avatar : profile.avatar
            }));
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    const UnFollowUser = async () => {
        try {
            const response = await AXIOS_CLIENT.post(`/users/unFollow/${profile.id}`);
            toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            dispatch(removefollow(profile.id));
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }
    return (
        <div className="post-list">
            <div className="profile-avatar">
                <figure>
                    <img src={profile?.avatar} alt={profile?.username} />
                </figure>
            </div>
            <div className="profile-info">
                <div className="profile-name">
                    <h2>{profile?.fullName}</h2>
                    <span>@{profile?.username}</span>
                    <p>{profile?.email}</p>
                </div>
                <ul className="profile-stats">
                    <li>post <span>{postLength}</span></li>
                    <li>followers <span>{profile.followers.length}</span></li>
                    <li>following <span>{profile.following.length}</span></li>
                </ul>
                <div className='profile-btn'>
                    {
                        profile.id === user.id  ?
                        <Link to={'/settings'}>Edit Profile</Link>:
                        (
                            user.following.filter(e => e.id === profile.id).length === 0 ?
                            <button onClick={FollowUser} key={profile.id} >Follow</button> :
                            <button onClick={UnFollowUser} key={profile.id} >unFollow</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

ProfileInfo.propTypes = {
    profile : PropTypes.object.isRequired,
    postLength : PropTypes.number.isRequired,
    user : PropTypes.object.isRequired,
}

export default ProfileInfo