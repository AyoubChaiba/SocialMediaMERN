import axios from 'axios';
import { useFormik } from 'formik';
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Register = () => {
    const [Loading , setLoading] = useState(false);
    const apiURL = import.meta.env.VITE_APP_URL_API ;
    let navigate = useNavigate()
    const {isLogin } = useSelector(state => state.profile)

    useEffect(()=> {
        isLogin && navigate('/')
    },[])

    const formik = useFormik({
        initialValues: {
        username: '',
        email: '',
        password: '',
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                let response = await axios.post(`${apiURL}/profile/register`,values);
                let user = response.data ;
                toast.success(user.message,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                navigate('/login')
            } catch(error) {
                console.log(error)
                toast.error(error.response.data.username,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                toast.error(error.response.data.email,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } finally {
                setLoading(false)
            }
        },
    });

return (
        <div className="flex items-center justify-center h-screen">
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
            <div className="mb-4">
            <label name="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>

            <div className="mb-4">
            <label name="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>

            <div className="mb-4">
            <label name="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            disabled={Loading}>
                {Loading && <FaSpinner className='animate-spin h-5 w-5 mr-3'/>}
                {Loading ? 'Loding...' : 'Sign In' }
                </button>
        </form>
        </div>
    );
};

export default Register;
