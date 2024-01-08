import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa6";
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import { setLoginOut , setCurrentProfile , setToken } from '../../toolkit/profile';

const Login = () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);
    // let [error, setError] = useState('');

    const dispatch = useDispatch()


    const {isLogin} = useSelector(state => state.profile);

    let navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_APP_URL_API;

    useEffect(()=> {
        isLogin && navigate('/')
    },[isLogin])

    let loginProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await axios.post(`${apiUrl}/profile/login`, {
                username: username,
                password: password,
            });
            let  userData = response.data;
            sessionStorage.setItem('currentToken', JSON.stringify(userData.token) );
            dispatch(setLoginOut(true));
            dispatch(setCurrentProfile(userData.profile));
            dispatch(setToken(userData.token))
            toast.success(userData.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            navigate('/');
        } catch (error) {
            // setError(error.response.data.message);
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
        <form onSubmit={loginProfile} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            <div className="flex items-center justify-between">
            <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            disabled={loading}>
                {loading && <FaSpinner className='animate-spin h-5 w-5 mr-3'/>}
                {loading ? 'Loding...' : 'Sign In' }
                </button>
            </div>
            </form>
        </div>
    );
};

export default Login;
