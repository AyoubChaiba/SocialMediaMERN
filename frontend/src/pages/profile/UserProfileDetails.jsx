
const UserProfileDetails = ({ userData }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">User Details</h3>
        <p><span className="font-semibold">Username:</span> {userData.username}</p>
        <p><span className="font-semibold">Email:</span> {userData.email}</p>
        <p><span className="font-semibold">Description:</span> {userData.description}</p>
        <img src={userData.image} alt="User" className="max-w-full mt-4" />
        </div>
    );
};



export default UserProfileDetails;
