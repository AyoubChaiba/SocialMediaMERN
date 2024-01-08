import {useState} from 'react'

const ActiveUsers = ({ activeUsers }) => {
    const [visibleActiveUsers, setVisibleActiveUsers] = useState(5);

    const loadMoreActiveUsers = () => {
    setVisibleActiveUsers((prevVisibleActiveUsers) => prevVisibleActiveUsers + 5);
    };

    return (
    <div className="bg-white p-4 mb-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Active Users</h2>
        <ul className="max-h-32 overflow-y-auto">
        {activeUsers.slice(0, visibleActiveUsers).map((user) => (
            <li key={user.id}>{user.name}</li>
        ))}
        </ul>
        {visibleActiveUsers < activeUsers.length && (
        <button className="text-blue-500 mt-2" onClick={loadMoreActiveUsers}>
            Load More
        </button>
        )}
    </div>
    );
};

export default ActiveUsers;
