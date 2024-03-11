import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addfollow, removefollow } from "../../toolkit/userSlice";
import { AXIOS_CLIENT } from '../../lib/api/axios';

const CardPeople = ({ username, avatar, id, user }) => {

    const dispatch = useDispatch()

    const FollowUser = async () => {
        try {
            const response = await AXIOS_CLIENT.post(`/users/follow/${id}`);
            toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            dispatch(addfollow({
                id : id,
                username : username,
                avatar : avatar
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
            const response = await AXIOS_CLIENT.post(`/users/unFollow/${id}`);
            toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            dispatch(removefollow(id));
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    return (
        <li>
            <Link to={`/${username}`}>
                <img src={avatar} alt={username} />
                <h2>{username}</h2>
            </Link>
            {
                user &&
                user.following.filter(e => e.id === id).length === 0?
                <button onClick={FollowUser}>Follow</button> :
                <button onClick={UnFollowUser}>Unfollow</button>
            }
        </li>
    )
}

CardPeople.propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.string,
    id: PropTypes.string,
    user: PropTypes.object
}

export default CardPeople