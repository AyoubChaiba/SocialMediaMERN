import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPenToSquare , FaBookmark , FaTrash , FaHeart , FaRegHeart  } from "react-icons/fa6";
import { AXIOS_CLIENT } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { deletePost, toggleLike } from '../../toolkit/postSlice';


const PostCard = ({ post, profile }) => {
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

    const Likes = async () => {
        try {
            await AXIOS_CLIENT.post(`/publication/likes/?postID=${post.id}&userID=${profile.id}`);
            dispatch(toggleLike({ postId: post.id, userId: profile.id }));
        } catch (error) {
            console.error(error);
        }
    };

    const DeletePublication = async () => {
        if (confirm('delete publication')) {
            try {
                const res = await AXIOS_CLIENT.delete(`/publication/${post.id}?userID=${profile.id}`);
                dispatch(deletePost({ postId: post.id }));
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="feed shadow">
            <div className="top">
                {post.author && (
                    <div className="user">
                        <img src={post.author.avatar} alt={post.author.username}/>
                        <div>
                            <h2 className="">{post.author.username}</h2>
                            <span className="">{time()}</span>
                        </div>
                    </div>
                )}
                <div className="menu">
                    <FaBookmark className='save'/>
                    {profile.id === post.author.id &&
                        <>
                        <Link to={`/edit/${post.id}`}><FaPenToSquare className="edit" /></Link>
                        <FaTrash className="remove" type="button" onClick={DeletePublication}/>
                        </>
                    }
                </div>
            </div>
            <div className='center'>
                <p className="description">
                    {showMore ? post.description : `${post.description.slice(0,50)} `}
                    {post.description.length > 50 && (
                    <span className="" onClick={() => setShowMore(!showMore)}>
                    {showMore ? ' less' : ' ...more'}
                    </span>
                )}
                </p>
                { post.image && <img src={post.image} alt="Post Image"/>}
            </div>
            <div className="btn_react">
                <button className="like" onClick={Likes}>
                    { post.likes.includes(profile.id) ? <FaHeart className='active' /> : <FaRegHeart />}
                    Like {post.likes.length>0 && post.likes.length }
                </button>
                <button className="">Comment</button>
            </div>
        </div>
        );
    };

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

export default PostCard;
