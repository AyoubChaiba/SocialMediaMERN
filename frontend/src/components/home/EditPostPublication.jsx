import axios from 'axios';
import  { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { FaSpinner } from "react-icons/fa6";
import { useParams, useNavigate } from 'react-router-dom';


const EditPostPublication = () => {
    const apiUrl = import.meta.env.VITE_APP_URL_API;
    const {id} = useParams();
    const {token , profile , isLogin} = useSelector(state => state.profile);
    const [Loading , setLoading] = useState(false);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
      title: '',
      description: '',
      image: null,
      imageUrl: '',
    });

    useEffect(()=>{
      const getData = async ()=> {
        try {
          const response = await axios.get(`${apiUrl}/publication/${id}`)
          console.log(response.data)
          setFormData({
            ...formData , 
            title : response.data.title ,
            description: response.data.description,
            imageUrl: response.data.image,
          })
        } catch (error) {
          console.log(error)
        }
      }
      getData()
    },[id])

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
      setLoading(true)
      e.preventDefault();
      try {
        const res = await axios.put(`${apiUrl}/publication/${id}`, {
          ...formData ,
          method: 'PUT' ,
        } , {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
        navigate('/')
      } catch (error) {
        console.log(error)
          if (error.response.status == 401) {
            toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          }
      } finally {
        setLoading(false)
      }
    };
return (
    <div className="">
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Post Publication</h2>

        <label htmlFor="title" className="block text-sm font-semibold mb-2">
            Title
        </label>
        <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
        />

        <label htmlFor="content" className="block text-sm font-semibold mt-3 mb-2">
          description
        </label>
        <textarea
            id="content"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
        />

<label htmlFor="image" className="block text-sm font-semibold mt-3 mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Selected Image"
            className="mt-2 max-w-full h-auto rounded w-20"
          />
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          disabled={Loading}
        >
          {Loading && <FaSpinner className='animate-spin h-5 w-5 mr-3'/>}
          {Loading ? 'Loding...' : 'Update Post Publication' }
        </button>
        </form>
    </div>
);
};

export default EditPostPublication;
