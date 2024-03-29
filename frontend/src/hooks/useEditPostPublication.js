import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AXIOS_CLIENT } from "../lib/api/axios";
import { useParams, useNavigate } from "react-router-dom";

const useEditPostPublication = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    description: "",
    image: null,
    imageUrl: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await AXIOS_CLIENT.get(`/publication/${id}`);
        console.log(response.data);
        setFormData({
          ...formData,
          title: response.data.title,
          description: response.data.description,
          imageUrl: response.data.image,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id, formData]);

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
    setLoading(true);
    e.preventDefault();
    try {
      const res = await AXIOS_CLIENT.put(
        `/publication/${id}?userID=${profile.id}`,
        formData
      );
      toast.success(res.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleInputChange,
    handleImageChange,
    handleFormSubmit,
  };
};

export default useEditPostPublication;
