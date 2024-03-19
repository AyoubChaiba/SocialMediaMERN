import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSpinner , FaImage , FaShare, FaHashtag  } from "react-icons/fa";
import { AXIOS_CLIENT } from '../../lib/api/axios';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { addPost } from '../../toolkit/postSlice';

const CreatePostPublication = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [btnActive, setActive] = useState(false);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
      description: '',
      image: undefined,
      imageUrl: '',
      tags: []
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name !== "tags" ? value : value.split(',').map(tag => tag.trim()),
      }));
    };

    const handleImageChange = (e) => {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFormData((prevData) => ({
        ...prevData,
        image: imageFile,
        imageUrl: imageUrl,
      }));
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await AXIOS_CLIENT.post(`/publication`, {
          description: formData.description,
          image: formData.image,
          tags: formData.tags,
        });
        dispatch(addPost(res.data.publication));
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setFormData({
          description: '',
          image: undefined,
          imageUrl: '',
          tags: []
        });
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error('An error occurred. Please try again later.', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="create shadow-md">
          <form onSubmit={handleFormSubmit}>
            <div className='top'>
              <img src={user?.avatar} alt="" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={`What's on your mind ${user ? user?.fullName : ''}`}
                required
              />
            </div>
            <hr />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Selected Image"
                className='img_preview'
              />
            )}
            <div className='bottom'>
                <div>
                  <label className="custom-button">
                    <FaImage  />
                    <input
                      type="file"
                      className="file-input"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <label className="custom-button" onClick={()=> setActive(!btnActive) }>
                    <FaHashtag />
                  </label>
                </div>
                  {
                    btnActive &&
                      <input type="text"
                        name="tags"
                        placeholder="tags, ..."
                        value={formData.tags.join(',')}
                        onChange={handleInputChange}
                    />
                  }
                <button type="submit" className="share_btn" disabled={loading}>
                  {
                    loading ? (<><FaSpinner className='loading' />Loading...</>)
                    : ( <><FaShare /> Share</>)
                  }
              </button>
            </div>
          </form>
        </div>
    );
};

CreatePostPublication.propTypes = {
  user: PropTypes.object,
};

export default CreatePostPublication;
