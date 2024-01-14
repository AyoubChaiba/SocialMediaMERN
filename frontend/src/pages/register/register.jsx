import axios from 'axios';
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../lib/validation/'
import { AXIOS_CLIENT } from '../../api/axios';



const Register = () => {
    let navigate = useNavigate()
    const { isLogin } = useSelector(state => state.profile)

    useEffect(()=> {
        isLogin && navigate('/')
    },[isLogin])


    const { register , handleSubmit , formState: { errors , isValid , isSubmitting } } = useForm({
        mode : 'onBlur' ,
        resolver: yupResolver(RegisterSchema) ,
        defaultValues : {
            username : '',
            email : '',
            password : ''
        }
    })


    let submitForm = async (data) => {
        try {
            let response = await AXIOS_CLIENT.post(`/profile/register`, data);
            const  USER_DATA = response.data;
            sessionStorage.setItem('currentToken', JSON.stringify(USER_DATA.token) );
            toast.success(USER_DATA.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
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
                    placeholder='Username'
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                        ${errors.username ? ' border-red-500' : ''}`}
                />
                <p className='text-red-500'>{errors.username?.message}</p>
                </div>

                <div className="mb-4">
                <label name="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    {...register("email")}
                    placeholder='Email'
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                        ${errors.email ? ' border-red-500' : ''}`}
                />
                <p className='text-red-500'>{errors.email?.message}</p>
                </div>

                <div className="mb-4">
                <label name="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    type="password"
                    placeholder='Password'
                    {...register("password")}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                        ${errors.password ? ' border-red-500' : ''}`}
                />
                <p className='text-red-500'>{errors.password?.message}</p>
                </div>
                <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={ isSubmitting || !isValid }
                >
                    {isSubmitting && <FaSpinner className='animate-spin h-5 w-5 mr-3'/>}
                    {isSubmitting ? 'Loding...' : 'Sign In' }
                </button>
            </form>
        </div>
    );
};

export default Register;
