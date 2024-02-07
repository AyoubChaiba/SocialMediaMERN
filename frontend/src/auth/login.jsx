import  { useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa6";
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import { setLoginOut , setCurrentProfile , setToken } from '../toolkit/profileSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../lib/validation';
import { AXIOS_CLIENT } from '../api/axios';
const Login = () => {

    const dispatch = useDispatch()
    let navigate = useNavigate();

    const {isLogin } = useSelector(state => state.profile);

    useEffect(()=> {
        isLogin && navigate('/')
    },[isLogin])



    const { register , handleSubmit , formState : { errors , isValid , isSubmitting , submitCount  } } = useForm({
        mode : 'onBlur' ,
        resolver : yupResolver(LoginSchema) ,
        defaultValues : {
            username : "" ,
            password : "" ,
        }
    })


    let loginProfile = async (data) => {
        try {
            let response = await AXIOS_CLIENT.post('/auth/login', data)
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
                    {submitCount > 10 ?
                        <div className="message-block">
                            <p className="text-red-500">You have been blocked</p>
                        </div>:
                        <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={ isSubmitting  || !isValid  }>
                            {isSubmitting  && <FaSpinner className='animate-spin h-5 w-5 mr-3'/>}
                            {isSubmitting  ? 'Loding...' : 'Sign In' }
                        </button>}
                </div>
            </form>
        </div>
    );
};

export default Login;
