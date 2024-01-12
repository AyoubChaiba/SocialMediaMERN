import { useState } from 'react';

const UserProfileForm = ({ onSubmit, userData }) => {
    const [formData, setFormData] = useState(userData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit}>
            <label className="block mb-2">
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-input mt-1 block w-full" />
            </label>
            {/* Other form fields */}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
        </form>
        </div>
    );
};

export default UserProfileForm;
