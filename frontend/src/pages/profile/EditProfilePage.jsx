import { useEffect, useState } from "react";
import UserProfileForm from "./userProfileForm";
import { AXIOS_CLIENT } from "../../api/axios";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { profile },
        } = await AXIOS_CLIENT.get("/auth/user");
        if (profile) {
          const { id, email, username, avatar } = profile;
          setUserData({ id, email, username, avatarUrl: avatar });
        } else {
          throw new Error("Profile data not found");
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleFormSubmit = async (updatedData) => {
    setUserData(updatedData);
    console.log(updatedData);
    try {
      const response = await AXIOS_CLIENT.put(
        `users/${updatedData.id}`,
        updatedData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <UserProfileForm onSubmit={handleFormSubmit} UserData={userData} />
      )}
    </div>
  );
};

export default UserProfile;
