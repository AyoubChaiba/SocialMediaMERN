import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from "../../toolkit/postSlice";
import PostCard from "../home/PostCard";
import { FaCircleNotch } from "react-icons/fa";
import InfiniteScroll from 'react-infinite-scroll-component';

const SavePost = () => {
    const { posts } = useSelector(state => state.posts);
    const { profile } = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`/users/${profile.username}/save`, {
                    params: {
                        page: page,
                        limit: 3,
                    }
                });
                const newPosts = response.data.savedPublication;
                setTimeout(() => {
                    setHasMore(newPosts.length > 0);
                    newPosts.length > 0 && dispatch(setPosts(newPosts));
                }, 2000);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublications();
    }, [dispatch, page, profile]);

    const onLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <h1>Favorite Post</h1>
            {loading ? (
                <div className="loading">
                    <FaCircleNotch />
                </div>
            ) : (
                <InfiniteScroll
                        dataLength={posts.length}
                        next={onLoadMore}
                        hasMore={hasMore}
                        loader={<h4 style={{ textAlign: 'center' , color: "white" }}>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' , color: "white" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} profile={profile} />
                    ))}
                </InfiniteScroll>
            )}
        </>
    );
};

export default SavePost;