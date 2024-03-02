import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { useSelector, useDispatch } from 'react-redux';
import PostCard from "../home/PostCard";
import { FaCircleNotch } from "react-icons/fa";
// import InfiniteScroll from 'react-infinite-scroll-component';
import ProfileInfo from "../profiles/profileInfo";
import { useParams } from 'react-router-dom';
import { setProfile, setPostProfile } from "../../toolkit/profilesSlice";

const Profile = () => {
    const { posts, profile } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { username } = useParams("username")

    const [loading, setLoading] = useState(true);
    // const [filter, setFilter] = useState("All");
    // const [page, setPage] = useState(1);
    // const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`/users/${username}`);
                const newPosts = response.data.profile;
                dispatch(setProfile(newPosts.user));
                dispatch(setPostProfile(newPosts.publication));
                // setTimeout(() => {
                //     setHasMore(newPosts.length > 0);
                //     newPosts.length > 0 && dispatch(setPosts(newPosts));
                // }, 2000);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublications();
    }, [dispatch, username]);

    // const onLoadMore = () => {
    //     setPage(prevPage => prevPage + 1);
    // };


    return (
        <>
            {loading ? (
                <div className="loading">
                    <FaCircleNotch />
                </div>
            ) : (
                <>
                <ProfileInfo profile={profile} user={user} postLength={posts.length}/>
                <hr />
                {
                    posts.map(post => (
                        <PostCard key={post.id} post={post} user={user} />
                    ))
                }
                </>
                // <InfiniteScroll
                //         dataLength={posts.length}
                //         next={onLoadMore}
                //         hasMore={hasMore}
                //         loader={<h4 style={{ textAlign: 'center' , color: "white" }}>Loading...</h4>}
                //         endMessage={
                //             <p style={{ textAlign: 'center' , color: "white" }}>
                //                 <b>Yay! You have seen it all</b>
                //             </p>
                //         }
                //     >
                //     {posts.map(post => (
                //         <PostCard key={post.id} post={post} profile={profile} />
                //     ))}
                // </InfiniteScroll>
            )}
        </>
    );
};

export default Profile;