import { useEffect } from "react";
import { AXIOS_CLIENT } from "../../api/axios";
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from "../../toolkit/postSlice";
import PostCard from "../home/PostCard";
import CreatePostPublication from "../home/CreatePostPublication";
import { useState } from "react";
import { FaCircleNotch } from "react-icons/fa6";


const FeedHome = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector( state => state.posts );
    const { profile } = useSelector( state => state.profile )
    const [Loading  , setLoading] = useState(false)

    useEffect(()=> {
        const Publication = async ()=> {
            try {
                setLoading(true)
                const response = await AXIOS_CLIENT.get(`/publication`);
                dispatch(setPosts(response.data.data))
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
    Publication()
    },[dispatch])

    return (
        <>
            {
                !Loading ? (<>
                    <h1>Create Post</h1>
                        <CreatePostPublication profile={profile} />
                    <h1>Home Feed</h1>
                    {posts.map((post, i) => (
                        <PostCard key={i} post={post} profile={profile}/>
                    ))}
                </>) :
                    <div className="loading">
                        <FaCircleNotch />
                    </div>
            }
        </>
    )
}


export default FeedHome