import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner, FaRightToBracket  } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../lib/validation';
import { AXIOS_CLIENT } from '../../lib/api/axios';
import "./auth.scss"
import  GoogleLogin  from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginOut, setCurrentUser, setToken } from '../../toolkit/userSlice';


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clientId = "1002242150441-svj22eab8fttrdre3dj8m5tpjabtrkij.apps.googleusercontent.com";

    useEffect(() => {
        gapi.load("client:auth2", ()=> {
            gapi.auth2.init({clientId:clientId})
        })
    },[])

    const { register , handleSubmit , formState: { errors, isValid, isSubmitting, submitCount } } = useForm({
        mode : 'onBlur' ,
        resolver: yupResolver(RegisterSchema) ,
        defaultValues : {
            firstName : '',
            lastName : '',
            username : '',
            email : '',
            password : ''
        }
    })


    let submitForm = async (data) => {
        try {
            let response = await AXIOS_CLIENT.post(`/auth/register`, data);
            const  USER_DATA = response.data;
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


    const responseGoogle = async (response) => {
        try {
            const res = await AXIOS_CLIENT.post('auth/google-login', {
                tokenId: response.tokenId
            });
            const USER_DATA = res.data;
            dispatch(setToken(USER_DATA.token));
            sessionStorage.setItem('currentToken', JSON.stringify(USER_DATA.token));
            dispatch(setCurrentUser(USER_DATA.profile));
            dispatch(setLoginOut(true));
            toast.success(USER_DATA.message, { position: toast.POSITION.BOTTOM_RIGHT });
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message, { position: toast.POSITION.BOTTOM_RIGHT });
            console.error(error);
        }
    };


return (
    <div className="login-container h-screen">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(submitForm)} className="form-login shadow-md px-8 pt-6 pb-8 mb-4 w-1/3">
            <div className="input-data mb-4">
                <label className="block text-sm font-bold mb-2">First name</label>
                <input
                    className={`shadow border rounded w-full py-2 px-3 leading-tight ${errors.firstName ? 'border-red-500' : ''}`}
                    type="text"
                    placeholder="First name"
                    {...register('firstName')}
                />
                <p className='text-red-500'>{errors.firstName?.message}</p>
            </div>
            <div className="input-data mb-4">
                <label className="block text-sm font-bold mb-2">Last name</label>
                <input
                    className={`shadow border rounded w-full py-2 px-3 leading-tight ${errors.lastName ? 'border-red-500' : ''}`}
                    type="text"
                    placeholder="Last name"
                    {...register('lastName')}
                />
                <p className='text-red-500'>{errors.lastName?.message}</p>
            </div>
            <div className="input-data mb-4">
                <label className="block text-sm font-bold mb-2">Username</label>
                <input
                    className={`shadow border rounded w-full py-2 px-3 leading-tight ${errors.username ? 'border-red-500' : ''}`}
                    type="text"
                    placeholder="Username"
                    {...register('username')}
                />
                <p className='text-red-500'>{errors.username?.message}</p>
            </div>
            <div className="input-data mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    className={`shadow border rounded w-full py-2 px-3 leading-tight ${errors.email ? 'border-red-500' : ''}`}
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div className="input-data mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    className={`shadow border rounded w-full py-2 px-3 leading-tight ${errors.password ? 'border-red-500' : ''}`}
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                />
                <p className='text-red-500'>{errors.password?.message}</p>
            </div>
            <div className="btn-form flex items-center justify-between">
                    {submitCount > 10 ?
                <div className="message-block">
                    <p className="text-red-500">You have been blocked</p>
                </div> :
                <button className="flex font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting || !isValid}>
                    {isSubmitting ? <FaSpinner className='animate-spin h-5 w-5' /> : <FaRightToBracket />}
                    {isSubmitting ? 'Loading...' :  'Sing Up'}
                </button>}
            </div>
        </form>
        <div className='form-login-google'>
            <h1>OR Login</h1>
            <GoogleLogin
                clientId={clientId}
                buttonText="Google Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    </div>
    );
};

export default Register;
