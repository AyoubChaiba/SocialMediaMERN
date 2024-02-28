import './profileInfo.scss'
import PropTypes from 'prop-types'

const ProfileInfo = ({ profile }) => {
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
                </div>
                <ul className="profile-stats">
                    <li>post 5</li>
                    <li>followers 1000</li>
                    <li>following 5000</li>
                </ul>
            </div>
        </div>
    )
}

ProfileInfo.propTypes = {
    profile : PropTypes.object.isRequired
}

export default ProfileInfo