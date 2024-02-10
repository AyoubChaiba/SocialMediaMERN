import  { useState } from 'react';
import {toast} from 'react-toastify'
import { FaSpinner , FaImage , FaShare  } from "react-icons/fa6";
import { AXIOS_CLIENT } from '../../api/axios';
import { PropTypes } from 'prop-types';


const CreatePostPublication = ({profile , updatePublication , publication}) => {
    const [Loading , setLoading] = useState(false)

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
        const res = await AXIOS_CLIENT.post(`/publication`, formdata);
        updatePublication([ res.data.publication , ...publication]);
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
      <form onSubmit={handleFormSubmit} className="">
        <div className='top'>
            <img src={profile?.avatar} alt="" />
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
            <button type="submit" className="share_btn" disabled={Loading} >
              {Loading ? <FaSpinner/> : <FaShare />}
              {Loading ? 'Loding...' : 'Share'}
            </button>
        </div>
      </form>
    </div>
);
};

CreatePostPublication.propTypes = {
  profile: PropTypes.object.isRequired,
  updatePublication: PropTypes.func.isRequired,
  publication: PropTypes.array,
};

export default CreatePostPublication;
