import './profileInfo.scss'
import PropTypes from 'prop-types';

const ProfileInfo = ({ user }) => {
    return (
        <div className="post-list">
            <div className="profile-avatar">
                <figure>
                    <img src={user?.avatar} alt={user?.username} />
                </figure>
            </div>
            <div className="profile-info">
                <div className="profile-name">
                    <h2>full name</h2>
                    <span>@{user?.username}</span>
                    <p>{user?.email}</p>
                </div>
            </div>
        </div>
    )
}

ProfileInfo.propTypes = {
    user : PropTypes.object.isRequired,
}

export default ProfileInfo