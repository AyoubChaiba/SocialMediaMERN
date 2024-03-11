import FormEdit from "../settings/FormEdit"
import { useSelector } from 'react-redux';
import FromSecurity from '../settings/FromSecurity';
import { PropTypes } from 'prop-types';

const EditProfile = ({ active }) => {
    const { user } = useSelector(state => state.user)
    return (
        <div className="editProfile">
            <h1>Edit User</h1>
                {
                    user && ( active === "profile" ?
                    <FormEdit user={user} /> :
                    <FromSecurity />
                    )
                }
        </div>
    );
};

EditProfile.propTypes = {
    active : PropTypes.string
}

export default EditProfile;
