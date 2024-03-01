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
                    <li>post<span>{postLength}</span></li>
                    <li>followers <span>{profile.followers.length}</span></li>
                    <li>following <span>{profile.following.length}</span></li>
                </ul>
                <ul className='profile-btn'>
                    {
                        profile.id === user.id  ?
                        <li><button>Edit Profile</button></li>:
                        <li><button>Follow</button></li>
                    }
                </ul>
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