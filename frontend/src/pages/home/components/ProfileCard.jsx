import { useSelector } from "react-redux";


const ProfileCard = () => {

    const {profile} = useSelector(state => state.profile) ;

    return (
        <div className="bg-white p-4 mb-4 rounded shadow">
        <img src={profile?.avatar} alt="User Profile" className="w-16 h-16 rounded-full mb-4" />
        <p className="font-semibold">{profile?.username}</p>
        <p className="text-gray-500">Occupation</p>
    </div>
    );
};
export default ProfileCard;