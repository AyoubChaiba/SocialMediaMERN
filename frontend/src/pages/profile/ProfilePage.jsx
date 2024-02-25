import { useEffect, useState } from 'react';
import {Profile , Post} from '../../components/index';
import { useParams } from 'react-router-dom';
import { AXIOS_CLIENT } from '../../lib/api/axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});

  const { username } = useParams('username')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AXIOS_CLIENT.get(`users/${username}`);
        console.log(response.data.profile.publication)
        setUser(response.data.profile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  let post = user?.publication
  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <div className="w-1/3">
          <Profile user={user} />
        </div>
        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Posts</h2>
          {post && post.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
