import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { useSelector, useDispatch } from 'react-redux';
import { setFavorite } from "../../toolkit/favoriteSlice";
import PostCard from "../home/PostCard";
import { FaCircleNotch } from "react-icons/fa";
// import InfiniteScroll from 'react-infinite-scroll-component';

const FavoritePost = () => {
    const { favorite, isValid } = useSelector(state => state.favorite);
    const { profile } = useSelector(state => state.profile);
    const dispatch = useDispatch();


    const [loading, setLoading] = useState(true);
    // const [page, setPage] = useState(1);
    // const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`/users/${profile?.username}/save`);
                const newPosts = response.data.favorite;
                    dispatch(setFavorite(newPosts));
                    // setHasMore(newPosts.length > 0);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublications();
    }, [dispatch, profile]);

    // const onLoadMore = () => {
    //     setPage(prevPage => prevPage + 1);
    // };


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
                        <PostCard key={favorite.id} post={favorite} profile={profile} isValid={isValid} />
                    ))}
                </>
                // <InfiniteScroll
                //         dataLength={favorite.length}
                //         next={onLoadMore}
                //         hasMore={hasMore}
                //         loader={<h4 style={{ textAlign: 'center' , color: "white" }}>Loading...</h4>}
                //         endMessage={
                //             <p style={{ textAlign: 'center' , color: "white" }}>
                //                 <b>Yay! You have seen it all</b>
                //             </p>
                //         }
                //     >
                //     {favorite.map(favorite => (
                //         <PostCard key={favorite.id} post={favorite} profile={profile} />
                //     ))}
                // </InfiniteScroll>
            )}
        </>
    );
};

export default FavoritePost;