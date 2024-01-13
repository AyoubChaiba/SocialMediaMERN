import axios from 'axios';
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
    username: yup.string().min(3).max(15).required('username is required'),
    email: yup.string().email('There are errors in writing an email').required('Email is required'),
    password: yup.string().min(8).max(20).required('password is required').matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one letter, one number, and one special character'
    ),
})

const Register = () => {
    let navigate = useNavigate()
    const {isLogin } = useSelector(state => state.profile)
    const [Loading , setLoading] = useState(false);
    const apiURL = import.meta.env.VITE_APP_URL_API ;

    useEffect(()=> {
        isLogin && navigate('/')
    },[isLogin])


    const { register , handleSubmit , formState: { errors , isValid } } = useForm({
        mode : 'onBlur' ,
        resolver: yupResolver(schema) ,
        defaultValues : {
            username : '',
            email : '',
            password : ''
        }
    })


    let submitForm = async (values) => {
        setLoading(true);
        try {
            let response = await axios.post(`${apiURL}/profile/register`, values);
            let user = response.data;
            toast.success(user.message, { position: toast.POSITION.BOTTOM_RIGHT });
            navigate('/login');
        } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response) {
            if (error.response.status === 400) {
            toast.error('Invalid request. Please check your data.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            } else {
            toast.error('An error occurred. Please try again later.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            }
        } else {
            toast.error('Network error. Please check your internet connection.', {
            position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        } finally {
        setLoading(false);
        }
    };

return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(submitForm)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
                <div className="mb-4">
                <label name="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                    type="text"
                    {...register("username")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className='text-red-500'>{errors.username?.message}</p>
                </div>

                <div className="mb-4">
                <label name="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    {...register("email")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className='text-red-500'>{errors.email?.message}</p>
                </div>

                <div className="mb-4">
                <label name="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    type="password"
                    {...register("password")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className='text-red-500'>{errors.password?.message}</p>
                </div>
                <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={ Loading || !isValid }
                >
                    {Loading && <FaSpinner className='animate-spin h-5 w-5 mr-3'/>}
                    {Loading ? 'Loding...' : 'Sign In' }
                </button>
            </form>
        </div>
    );
};

export default Register;
