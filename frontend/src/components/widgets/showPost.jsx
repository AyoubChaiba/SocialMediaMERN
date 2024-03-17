import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { useSelector, useDispatch } from 'react-redux';
import PostCard from "../home/PostCard";
import { FaCircleNotch } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { setPost } from "../../toolkit/postSlice";

const ShowPost = () => {
    const { post } = useSelector(state => state.posts);
    const { user } = useSelector(state => state.user);
    // const [ post , setPost] =  useState([])
    const { id } = useParams()
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const { data } = await AXIOS_CLIENT.get(`/publication/${id}`);
                dispatch(setPost(data));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublications();
    }, [dispatch,id]);

    console.log(post)
    return (
        <>
            <h1>Favorite Post</h1>
            {loading ? (
                <div className="loading">
                    <FaCircleNotch />
                </div>
            ) : (
                <>
                    {post.map(post => (
                        <PostCard key={post.id} post={post} user={user} />
                    ))}
                </>
            )}
        </>
    );
};

export default ShowPost;