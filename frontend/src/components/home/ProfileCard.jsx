import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';


const ProfileCard = () => {
    const { profile } = useSelector(state => state.profile) ;

    return (
        <div className="profile">
            <img src={profile?.avatar} alt={profile?.username} />
            <div>
                <h2>Ayoub Chiba</h2>
                <Link to={`/profile/${profile?.username}`}>@{profile?.username}</Link>
            </div>
        </div>
    );
};

ProfileCard.propTypes = {
    profile: PropTypes.object,
}
export default ProfileCard;