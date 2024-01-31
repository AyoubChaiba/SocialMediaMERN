import { useState } from 'react'
import PropTypes from 'prop-types'

const UserProfileForm = ({ onSubmit, UserData }) => {
    const [formUser , setFormUser] = useState({
        username : UserData?.username || '',
        email : UserData?.email || '',
        avatar : null,
        avatar_Url : UserData?.avatar_Url|| ''
    });

    const handleChange = (event) => {
        setFormUser({...formUser, [event.target.name]: event.target.value })
    }

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFormUser({...formUser, avatar: imageFile, avatar_Url: imageUrl })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formUser);
    }

return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
            Email
            </label>
            <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name='email'
            value={formUser.email}
            onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
            Username
            </label>
            <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name='username'
            value={formUser.username}
            onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="profileImage">
            Profile Image
            </label>
            <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            onChange={handleImageChange}
            />
        </div>
        {formUser.avatar_Url && (
            <img
                src={formUser.avatar_Url}
                alt="Selected Image"
                className="mt-2 max-w-full h-auto rounded w-20"
            />
        )}
        {/* <div className="mb-4">
            <label className="inline-block text-gray-700 font-bold mb-2">
            <input
                type="checkbox"
                className="form-checkbox mr-2"
                checked={displayEmail}
                onChange={() => setDisplayEmail(!displayEmail)}
            />
            Display email on profile
            </label>
        </div> */}
        <div className="mb-4">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Save
            </button>
        </div>
    </form>
)
}

UserProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    UserData: PropTypes.object.isRequired,
}

export default UserProfileForm