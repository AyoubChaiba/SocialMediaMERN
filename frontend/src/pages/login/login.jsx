import  { useEffect , useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa6";
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import { setLoginOut , setCurrentProfile , setToken } from '../../toolkit/profile';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
    const dispatch = useDispatch()

    const {isLogin } = useSelector(state => state.profile);

    let navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_APP_URL_API;

    useEffect(()=> {
        isLogin && navigate('/')
    },[isLogin])

    const schema = yup.object().shape({
        username: yup.string().required('Username is required').min(4).max(20),
        password: yup.string().required('Password is required')
            .min(5, 'Password must be at least 8 characters')
            .max(20, 'Password must not exceed 20 characters')
            .matches(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one letter, one number, and one special character'
            ),
        })

    const { register , handleSubmit , formState : { errors , isValid , isSubmitting  } } = useForm({
        mode : 'onBlur' ,
        resolver : yupResolver(schema) ,
        defaultValues : {
            username : "" ,
            password : "" ,
        }
    })


    let loginProfile = async (data) => {
        try {
            let response = await axios.post(`${apiUrl}/profile/login`, data);
            const  USER_DATA = response.data;
            sessionStorage.setItem('currentToken', JSON.stringify(USER_DATA.token) );
            dispatch(setLoginOut(true));
            dispatch(setCurrentProfile(USER_DATA.profile));
            dispatch(setToken(USER_DATA.token))
            toast.success(USER_DATA.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <p></p>
            <form onSubmit={handleSubmit(loginProfile)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                        ${errors.username ? ' border-red-500' : ''}`}
                        type="text"
                        placeholder="Username"
                        {...register('username')}
                    />
                    <p className='text-red-500'>{errors.username?.message}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                            ${errors.password ? ' border-red-500' : ' '}`}
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                        />
                        <p className='text-red-500'>{errors.password?.message}</p>
                </div>

                <div className="flex items-center justify-between">
                    <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={ isSubmitting  || !isValid }>
                        {isSubmitting  && <FaSpinner className='animate-spin h-5 w-5 mr-3'/>}
                        {isSubmitting  ? 'Loding...' : 'Sign In' }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
