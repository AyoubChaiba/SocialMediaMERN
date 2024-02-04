

const Profile = ({ user }) => {
  return (
    <div className="bg-gray-100 p-4">
      <img
        src={user.avatar}
        alt={`${user.username}'s avatar`}
        className="rounded-full w-20 h-20 object-cover mb-4"
      />
      <h2 className="text-2xl font-semibold">{user.username}</h2>
      <p className="text-gray-600 mb-2">{user.email}</p>
      <p className="text-gray-600">Member since {user.created}</p>
    </div>
  );
};

export default Profile;
