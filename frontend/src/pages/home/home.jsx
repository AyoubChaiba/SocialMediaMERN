import { PostCard , ActiveUsers , ProfileCard , Followers , CreatePostPublication  } from '../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AXIOS_CLIENT } from '../../api/axios';
import "./home.scss"

const Home = () => {
    const [ publication , setPublication ] = useState([]);
    const { profile } = useSelector(state => state.profile) ;


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

    const updatePublication = (newPublication) => {
        setPublication(newPublication);
    };


const sampleFollowers = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Follower ${index + 1}`,
}));

const sampleActiveUsers = Array.from({ length: 1 }, (_, index) => ({
    id: index + 1,
    name: `Active User ${index + 1}`,
}));

return (
    <div className="home container mx-auto">
        <div className="left">
            <ProfileCard profile={profile} />
        </div>
        <div className="center">
                <h1>Create Post</h1>
                {profile && <CreatePostPublication
                profile={profile}
                updatePublication={updatePublication}
                publication={publication} />}
                <h1>Home Feed</h1>
                {publication.map((post, i) => (
                    <PostCard
                    key={i}
                    post={post}
                    profile={profile}
                    updatePublication={updatePublication}
                    publication={publication} />
                ))}
        </div>
        <div className="right">
            <Followers followers={sampleFollowers} />
            <ActiveUsers activeUsers={sampleActiveUsers} />
        </div>
    </div>
);
};

export default Home;