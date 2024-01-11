// import { Link } from "react-router-dom";
import {ListLink} from "./ListLink";
import { FaBars } from "react-icons/fa6";
import Notification from "./notification"
import ProfileNav from "./profileNav";
import BtnConnect from "./btnConnect";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { setLoginOut , setCurrentProfile , setToken } from "../../toolkit/profile";
import axios from "axios";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

let Header = () => {
    const { isLogin , token , profile} = useSelector(state => state.profile) ;
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_APP_URL_API;

    useEffect(()=>{
        const getdata = async () => {
            try {
                const response = await axios.get(`${apiUrl}/profile/user`,{
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                console.log(response.data)
                disPatch(setCurrentProfile(response.data.profile))
            } catch (error) {
                if (error?.response?.status === 401) {
                    sessionStorage.removeItem('currentToken');
                    disPatch(setToken(''))
                    disPatch(setLoginOut(false))
                    toast.error('Login is failed', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        }
        token && getdata()
    },[token])


    const loginOut = () => {
        sessionStorage.removeItem('currentToken');
        disPatch(setToken(''));
        disPatch(setLoginOut(false));
        disPatch(setCurrentProfile(null));
        toast.success('Logged out successfully', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        navigate('/login')
    }


    return (
        <nav className="bg-gray-800 sticky top-0">
        <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <FaBars className="block h-6 w-6" />
            </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                    <ListLink />
                </div>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {
                    !isLogin ? 
                        <BtnConnect /> : 
                    <>
                        <Notification /> 
                        <ProfileNav profile={profile} loginOut={loginOut} />
                    </>
                }

            </div>
        </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
        </div>
        </div>
        </nav>

    )
}


export default Header