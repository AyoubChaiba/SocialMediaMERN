import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AXIOS_CLIENT } from '../../api/axios';


const PostCard = ({ id , title , description , date_create ,image , author , likes  }) => {
    const [BtnActive ,setbtnActive] = useState(false);
    const [showMore , setShowMore] = useState(false);
    const currentDate = new Date();

    const time = () => {
        const timeDifference = currentDate - new Date(date_create);
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

    const Likes = async (postID) => {
        try {
            await AXIOS_CLIENT.post('/publication/likes', {
            postID: postID,
            });
            } catch (error) {
            console.error(error);
            }
    };


    const DeletePublication = () => {
        if (confirm('delete publication')) {
            try {
                const res = AXIOS_CLIENT.delete(`publication/${id}`)
                toast.success(res.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="bg-white p-4 mb-4 rounded shadow">
            <div className="flex justify-between items-start">
            <div className="flex items-center mb-4">
                {author && (
                    <>
                        <img
                            src={author.avatar}
                            alt={author.username}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                        <div>
                            <p className="font-semibold">{author.username}</p>
                            <p className="text-gray-500">{time()}</p>
                        </div>
                    </>
                )}
            </div>

                <div className="flex justify-end relative">
                    <button className="text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                    type="button"
                    onClick={()=> setbtnActive(!BtnActive)}
                    >
                        <span className="sr-only">Open dropdown</span>
                        <FaBars className="h-6 w-6" />
                    </button>
                    {
                        BtnActive &&
                        <div id="dropdown" className="absolute top-7 z-10 text-base bg-white divide-y divide-gray-100 rounded-lg shadow w-44 right-0 mt-2">
                            <ul className="py-2" aria-labelledby="dropdownButton">
                                <li><Link to={`/edit/${id}`} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-300 transition duration-300">Edit</Link></li>
                                <li>
                                <button
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-300 transition duration-300 cursor-pointer"
                                onClick={DeletePublication}>
                                    delete
                                </button>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            <h1 className="font-semibold mb-4">{title}</h1>
                {
                    image && <img
                    src={image ? image : 'default-image-url'}
                    alt="Post Image"
                    className="w-full h-auto mb-4 object-center rounded"/>
                }
                <div>
                <p className={`mb-4 break-all`}>
                    {showMore ? description : `${description.slice(0,50)} `}
                    {description.length > 50 && (
                    <span className="text-blue-500 cursor-pointer" onClick={() => setShowMore(!showMore)}>
                    {showMore ? ' less' : ' more'}
                    </span>
                )}
                </p>
                </div>

            <div className="flex items-center">
                <button className="text-blue-500 mr-4" onClick={() => Likes(id) }>Like {likes}</button>
                <button className="text-gray-500">Comment</button>
            </div>
        </div>
    );
};

PostCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date_create: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    author: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
};

export default PostCard;
