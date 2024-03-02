import { useSelector } from 'react-redux';

const Friends = () => {
    const { user } = useSelector(state => state.user);
    return (
        <div className="following">
            <ul>
                { user &&
                    user?.following?.map(following => {
                        return (
                            <li key={following.id}>
                                <img src={following.avatar} alt={following.username} />
                                <h2>{following.username}</h2>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Friends