import { useState } from 'react';
import { UserProfileForm , UserProfileDetails } from '../../components/';

const EditProfilePage = () => {
    const [userData, setUserData] = useState({
        username: 'exampleUser',
        email: 'example@example.com',
        image: 'url-to-image',
        password: '',
        description: 'This is a sample description.',
    });

    const handleFormSubmit = (updatedData) => {
        setUserData(updatedData);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* <UserProfileDetails userData={userData} /> */}
                    <UserProfileForm onSubmit={handleFormSubmit} userData={userData} />
                </div>
        </div>
    );
};

export default EditProfilePage;
