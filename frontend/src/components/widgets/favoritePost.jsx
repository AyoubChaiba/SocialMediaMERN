import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { useSelector, useDispatch } from 'react-redux';
import { setFavorite } from "../../toolkit/favoriteSlice";
import PostCard from "../home/PostCard";
import { FaCircleNotch } from "react-icons/fa";
// import InfiniteScroll from 'react-infinite-scroll-component';

const FavoritePost = () => {
    const { favorite, isValid } = useSelector(state => state.favorite);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`/users/${user?.username}/save`);
                const newPosts = response.data.favorite;
                    dispatch(setFavorite(newPosts));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublications();
    }, [dispatch, user]);

    return (
        <>
            <h1>Favorite Post</h1>
            {loading ? (
                <div className="loading">
                    <FaCircleNotch />
                </div>
            ) : (
                <>
                    {favorite.map(favorite => (
                        <PostCard key={favorite.id} post={favorite} user={user} isValid={isValid} />
                    ))}
                </>
            )}
        </>
    );
};

export default FavoritePost;