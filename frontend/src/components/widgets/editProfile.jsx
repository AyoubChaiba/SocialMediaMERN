import FormEdit from "../settings/editProfile"
import { useSelector } from 'react-redux';

const EditProfile = () => {
    const { user } = useSelector(state => state.user)

    return (
        <div className="editProfile">
            <h1>Edit User</h1>
                {
                    user ? <FormEdit user={user} /> : <div>logged in</div>
                }
        </div>
    );
};

export default EditProfile;
