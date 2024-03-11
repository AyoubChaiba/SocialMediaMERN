import { Link } from 'react-router-dom';
import './profileInfo.scss'
import PropTypes from 'prop-types';

const ProfileInfo = ({ profile, postLength, user }) => {
    return (
        <div className="post-list">
            <div className="profile-avatar">
                <figure>
                    <img src={profile?.avatar} alt={profile?.username} />
                </figure>
            </div>
            <div className="profile-info">
                <div className="profile-name">
                    <h2>full name</h2>
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
                            <button key={profile.id} >Follow</button> :
                            <button key={profile.id} >unFollow</button>
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