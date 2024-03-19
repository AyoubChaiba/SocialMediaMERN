import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { useSelector } from 'react-redux';
import { FaCircleNotch } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import PostCard from '../home/PostCard';

const PageTag = () => {
    const { user } = useSelector(state => state.user);
    const { name } = useParams()

    const [loading, setLoading] = useState(true);
    const [postTags, setPostTags] = useState();


    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`tags/${name}`);
                setPostTags(response.data.publications)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublications();
    }, [name]);

    return (
        <>
            <h1>tags <span>{`#${name}`}</span></h1>
            {loading ? (
                <div className="loading">
                    <FaCircleNotch />
                </div>
            ) : (
                <>
                    {postTags.map(post => (
                        <PostCard key={post.id} post={post} user={user} />
                    ))}
                </>
            )}
        </>
    );
};

export default PageTag;