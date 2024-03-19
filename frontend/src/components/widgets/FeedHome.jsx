import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, Filter } from "../../toolkit/postSlice";
import PostCard from "../home/PostCard";
import CreatePostPublication from "../home/CreatePostPublication";
import { FaCircleNotch } from "react-icons/fa";
import InfiniteScroll from 'react-infinite-scroll-component';

const FeedHome = () => {
    const { posts } = useSelector(state => state.posts);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`/publication`, {
                    params: {
                        filter: filter,
                        page: page,
                        limit: 3,
                    }
                });
                const newPosts = response.data.formatPublication;
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
    }, [dispatch, filter, page]);

    const onLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleChangeFilter = async (e) => {
        const newFilter = e.target.value;
        if (filter === newFilter) return;
        try {
            setLoading(true);
            const response = await AXIOS_CLIENT.get(`/publication`, {
                params: {
                    filter: newFilter,
                    page: 1,
                    limit: 3,
                }
            });
            const newPosts = response.data.formatPublication;
            setHasMore(newPosts.length > 0);
            dispatch(Filter(newPosts));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setFilter(newFilter);
            setPage(1)
        }
    };

    return (
        <>
            <h1>Create Post</h1>
            <CreatePostPublication user={user} />
            <div className="topFeed">
                <h1>Home Feed</h1>
                <div className="btnFeed">
                    <button onClick={handleChangeFilter} value={"All"} className={`${filter === "All" ? "active" : ""}`}>All</button>
                    <button onClick={handleChangeFilter} value={"Relevant"} className={`${filter === "Relevant" ? "active" : ""}`}>Relevant</button>
                    <button onClick={handleChangeFilter} value={"Top"} className={`${filter === "Top" ? "active" : ""}`}>Top</button>
                </div>
            </div>
            {loading ? (
                <div className="loading">
                    <FaCircleNotch />
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={onLoadMore}
                    hasMore={hasMore}
                    loader={<h4 className="loader">Loading...</h4>}
                    endMessage={
                        <p className="loader">
                            <b >Yay! You have seen it all</b>
                        </p>
                    }
                    >
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} user={user} />
                    ))}
                </InfiniteScroll>
            )}
        </>
    );
};

export default FeedHome;