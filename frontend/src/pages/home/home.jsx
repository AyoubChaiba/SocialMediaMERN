import PostCard from './components/PostCard';
// import Followers from './components/Followers';
import ActiveUsers from './components/ActiveUsers';
import ProfileCard from './components/ProfileCard';
import CreatePostPublication from './components/CreatePostPublication';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditPostPublication from './components/EditPostPublication';

const Home = ({edit}) => {

    const api_Url = import.meta.env.VITE_APP_URL_API
    const [publication , setPublication] = useState([]);

    useEffect(()=> {
        Publication()
    },[])

    const Publication = async ()=> {
        try {
            const response = await axios.get(`${api_Url}/publication`);
            setPublication(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(publication)

// const sampleFollowers = Array.from({ length: 20 }, (_, index) => ({
// id: index + 1,
// name: `Follower ${index + 1}`,
// }));

const sampleActiveUsers = Array.from({ length: 20 }, (_, index) => ({
id: index + 1,
name: `Active User ${index + 1}`,
}));

return (
    <div className="container mx-auto py-6 px-5 grid grid-cols-1 lg:grid-cols-7 gap-7">
        <div className="col-span-2">
            <div className="sticky top-20">
                <ProfileCard />
            </div>
        </div>
        <div className="col-span-3">
            {
                !edit ?
                <>
                    <CreatePostPublication />
                    <div className='grid grid-cols-1 lg:grid-cols-1 my-4'>
                        {publication.map((post, i) => (
                            <PostCard key={i} {...post} /> 
                        ))}
                    </div>
                </> :
                <EditPostPublication />
            }
        </div>

        <div className="col-span-2">
            {/* <div className="sticky top-20"> */}
                {/* <Followers followers={sampleFollowers} /> */}
                <ActiveUsers activeUsers={sampleActiveUsers} />
            {/* </div> */}
        </div>
    </div>
);
};

export default Home;
