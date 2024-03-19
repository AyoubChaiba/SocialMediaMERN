import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaRightToBracket  } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useDispatch} from 'react-redux';
import { setLoginOut, setCurrentUser, setToken } from '../../toolkit/userSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../lib/validation';
import { AXIOS_CLIENT } from '../../lib/api/axios';
import "./auth.scss";
import  GoogleLogin  from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const clientId = "1002242150441-svj22eab8fttrdre3dj8m5tpjabtrkij.apps.googleusercontent.com";

    useEffect(() => {
        gapi.load("client:auth2", ()=> {
            gapi.auth2.init({clientId:clientId})
        })
    },[])

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting, submitCount } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const loginProfile = async (data) => {
        try {
            const response = await AXIOS_CLIENT.post('/auth/login', data);
            const USER_DATA = response.data;
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit(loginProfile)} className="form-login shadow-md px-8 pt-6 pb-8 mb-4 w-1/3">
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
                            {isSubmitting ? 'Loading...' :  'Sign In'}
                        </button>}
                </div>
            </form>
            <div className='form-login-google'>
                <h1>OR Login</h1>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
};

export default Login;
