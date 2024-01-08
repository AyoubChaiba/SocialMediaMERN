import {useState} from 'react'

const Followers = ({ followers }) => {
    const [visibleFollowers, setVisibleFollowers] = useState(10);

    const loadMoreFollowers = () => {
        setVisibleFollowers((prevVisibleFollowers) => prevVisibleFollowers + 10);
    };

    return (
        <div className="bg-white p-4 mb-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Followers</h2>
        <ul className="max-h-32 overflow-y-auto">
            {followers.slice(0, visibleFollowers).map((follower) => (
            <li key={follower.id}>{follower.name}</li>
            ))}
        </ul>
        {visibleFollowers < followers.length && (
            <button className="text-blue-500 mt-2" onClick={loadMoreFollowers}>
            Load More
            </button>
        )}
        </div>
    );
};

export default Followers;