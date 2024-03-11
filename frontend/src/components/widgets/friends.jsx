import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Friends = () => {
    const { user } = useSelector(state => state.user);
    return (
        <div className="following">
            <ul>
            <h2>Contacts</h2>
                { user &&
                    user?.following?.map(following => {
                        return (
                            <li key={following.id}>
                                <Link to={`/${following.username}`}>
                                    <img src={following.avatar} alt={following.username} />
                                    <h2>{following.username}</h2>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Friends