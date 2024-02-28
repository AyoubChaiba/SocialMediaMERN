import { useState } from 'react';
import { toast } from 'react-toastify'
import { FaSpinner , FaImage , FaShare  } from "react-icons/fa6";
import { AXIOS_CLIENT } from '../../lib/api/axios';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { addPost } from '../../toolkit/postSlice';

const CreatePostPublication = ({ user }) => {
    const [Loading , setLoading] = useState(false);
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
      description: '',
      image: undefined,
      imageUrl: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
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
      const formdata = new FormData();
      formdata.append('image', formData.image);
      formdata.append('description', formData.description);
      const res = await AXIOS_CLIENT.post(`/publication/?userID=${user.id}`, formdata);
      dispatch(addPost(res.data.publication))
      toast.success(res.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setFormData({ description: '', image: undefined });
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
            placeholder="What's on your mind John Doe?"
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
            <button type="submit" className="share_btn" disabled={Loading}>
              {
                Loading ? (<><FaSpinner className='loading' />Loading...</>)
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
