import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPenToSquare , FaBookmark , FaTrash , FaHeart , FaRegHeart, FaRegBookmark } from "react-icons/fa6";
import { AXIOS_CLIENT } from '../../lib/api/axios';
import { useDispatch } from 'react-redux';
import { deletePost, toggleLike, } from '../../toolkit/postSlice';
import { deleteProfilePost, postProfileLike, } from '../../toolkit/profilesSlice';
import { toggleFavorite } from '../../toolkit/favoriteSlice';
import { userFavorite, removefollow, addfollow } from '../../toolkit/userSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Placeholder from "../../assets/placeholder.jpg"


const PostCard = ({ post, user }) => {
    const [showMore , setShowMore] = useState(false);
    const dispatch = useDispatch();
    const currentDate = new Date();

    const time = () => {
        const timeDifference = currentDate - new Date(post.date_create);
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        switch (true) {
            case seconds < 60:
                return `${seconds} seconds ago`;
            case minutes < 60:
                return `${minutes} minutes ago`;
            case hours < 24:
                return `${hours} hours ago`;
            default:
                return `${days} days ago`;
        }
    };

    const LikesPublication = async () => {
        try {
            await AXIOS_CLIENT.post(`/publication/likes/?postID=${post.id}&userID=${user.id}`);
            dispatch(toggleLike({ postId: post.id, userId: user.id }));
            dispatch(postProfileLike({ postId: post.id, userId: user.id }));
        } catch (error) {
            console.error(error);
        }
    };

    const DeletePublication = async () => {
        if (confirm('delete publication')) {
            try {
                const res = await AXIOS_CLIENT.delete(`/publication/${post.id}?userID=${user.id}`);
                dispatch(deletePost({ postId: post.id }));
                dispatch(deleteProfilePost({ postId: post.id }));
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const FavoriteSave = async () => {
        try {
            const response = await AXIOS_CLIENT.post(`/users/${user.username}/save?postID=${post.id}`);
            toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            dispatch(toggleFavorite({ postId: post.id, userId: user.id }));
            dispatch(userFavorite({ postId: post.id }))
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    const FollowUser = async () => {
        try {
            const response = await AXIOS_CLIENT.post(`/users/follow/${post.author.id}`);
            toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            dispatch(addfollow({
                id : post.author.id,
                username : post.author.username,
                avatar : post.author.avatar
            }));
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    const UnFollowUser = async () => {
        try {
            const response = await AXIOS_CLIENT.post(`/users/unFollow/${post.author.id}`);
            toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            dispatch(removefollow(post.author.id));
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    return (
        <div className="feed shadow">
            <div className="top">
                {post.author && (
                    <div className="user">
                        <img src={post.author.avatar} alt={post.author.username} />
                    <div>
                        <div>
                        {user && (
                            <Link to={`/${post.author.username}`}><h2>{post.author.username}</h2></Link>
                        )}
                        {user &&
                            post.author.id !== user.id  && (
                                user.following.filter(e => e.id === post.author.id).length === 0 ?
                                <button key={post.author.id} onClick={FollowUser}>Follow</button> :
                                <button key={post.author.id} onClick={UnFollowUser}>unFollow</button>
                            )
                            }
                        </div>
                        <span>{time()}</span>
                    </div>
                </div>
                )}
                <div className="menu">
                    {
                        user.id === post.author.id  ?
                            <div className='btn_remove_edit'>
                                <Link to={`/edit/${post.id}`}><FaPenToSquare className="edit" /></Link>
                                <FaTrash className="remove" type="button" onClick={DeletePublication}/>
                            </div> : user.favorite &&
                        <div className='btn_favorite'>{
                            user.favorite.includes(post.id)  ?
                                <FaBookmark onClick={FavoriteSave} className='save-Active'/> :
                                <FaRegBookmark onClick={FavoriteSave} className='save' />
                            }
                        </div>
                    }
                </div>
            </div>
            <div className='center'>
                <p className="description">
                    {showMore ? post.description : `${post.description.slice(0,200)} `}
                    {post.description.length > 200 && (
                    <span className="" onClick={() => setShowMore(!showMore)}>
                        {showMore ? ' less' : ' ...more'}
                    </span>
                )}
                </p>
                <div className='tags'>
                    { post.tags &&
                        post.tags.map(e => {
                            return <Link to={`tags/${e.name}`} key={e.id}>{e.name}</Link>
                        })
                    }
                </div>
                { post.image && <LazyLoadImage
                    alt="Post Image"
                    effect="blur"
                    src={post.image}
                    placeholderSrc={Placeholder}
                    />}
            </div>
            {post?.likesUser &&
                <div className="btn_react">
                    <button className="like" onClick={LikesPublication}>
                        { post?.likesUser.includes(user.id) ? <FaHeart className='active' /> : <FaRegHeart />}
                        Like {post.likes> 0 && post.likes}
                    </button>
                    <button className="">Comment</button>
                </div>
            }
        </div>
        );
    };

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default PostCard;
