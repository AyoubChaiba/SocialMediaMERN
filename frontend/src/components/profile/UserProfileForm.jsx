import { useState } from 'react';
import PropTypes from 'prop-types';

const UserProfileForm = ({ onSubmit, userData }) => {
    const [formData, setFormData] = useState(userData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
            <label className="block mb-2">
                Full Name:
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.username ? ' border-red-500' : ''}`}
                />
            </label>
            <label className="block mb-2">
                Username:
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.username ? ' border-red-500' : ''}`}
                />
            </label>
            <label className="block mb-2">
                Email:
                <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.username ? ' border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </label>
            <label htmlFor="image" className="block text-sm font-semibold mt-3 mb-2">
                Image
                </label>
                <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                // onChange={handleImageChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
                {formData.imageUrl && (
                <img
                    src={formData.imageUrl}
                    alt="Selected Image"
                    className="mt-2 max-w-full h-auto rounded w-20"
                />
                )}
            <label className="block mb-2">
                Password:
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.username ? ' border-red-500' : ''}`}
                />
            </label>
            <label className="block mb-2">
                Bio:
                <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.username ? ' border-red-500' : ''}`}
                />
            </label>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Changes
            </button>
            </form>
        </div>
    );
};

UserProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

export default UserProfileForm;
