// import { useEffect, useState } from "react";
// import { AXIOS_CLIENT } from "../../lib/api/axios"
import ProfileInfo from "../profiles/profileInfo";
import EditProfile from "../settings/editProfile"
import { useSelector } from 'react-redux';

const SettingProfile = () => {
    const { user } = useSelector(state => state.user)

    return (
        <div className="editProfile">
            <h1>User</h1>
                {
                    user ? <ProfileInfo user={user} /> : <div>logged in</div>
                }
            <h1>Edit User</h1>
                {
                    user ? <EditProfile user={user} /> : <div>logged in</div>
                }
        </div>
    );
};

export default SettingProfile;
