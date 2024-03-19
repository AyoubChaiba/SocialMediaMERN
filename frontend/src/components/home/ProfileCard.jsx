import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';


const ProfileCard = () => {
    const { user } = useSelector(state => state.user) ;

    return (
        <div className="profile">
            <img src={user?.avatar} alt={user?.username} />
            <div>
                <h2>{user?.fullName}</h2>
                <Link to={`/${user?.username}`}>@{user?.username}</Link>
            </div>
        </div>
    );
};

ProfileCard.propTypes = {
    user: PropTypes.object,
}
export default ProfileCard;