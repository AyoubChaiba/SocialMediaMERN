import { PostCard , ActiveUsers , ProfileCard , CreatePostPublication , EditPostPublication , Followers  } from '../../components';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AXIOS_CLIENT } from '../../api/axios';

import Button from '@mui/material/Button';

const Home = ({edit}) => {
    const [publication , setPublication] = useState([]);

    useEffect(()=> {
        const Publication = async ()=> {
            try {
                const response = await AXIOS_CLIENT.get(`/publication`);
                setPublication(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        Publication()
    },[])



const sampleFollowers = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Follower ${index + 1}`,
}));

const sampleActiveUsers = Array.from({ length: 1 }, (_, index) => ({
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
                <Followers followers={sampleFollowers} />
                <ActiveUsers activeUsers={sampleActiveUsers} />
            {/* </div> */}
        </div>
    </div>
);
};

Home.propTypes = {
    edit: PropTypes.bool.isRequired,
};

export default Home;
