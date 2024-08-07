// import { ListLink } from "./ListLink";
// import { FaBars } from "react-icons/fa6";
// import Notification from "./notification"
import ProfileNav from "../../components/navbar/profileNav";
import BtnConnect from "../../components/navbar/btnConnect";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { setLoginOut , setCurrentUser , setToken } from "../../toolkit/userSlice";
import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { FaMoon , FaSun  } from "react-icons/fa6";
import "./NavBar.scss"
import { setDarkMode } from "../../toolkit/darkModeSlice";
import Search from "../../components/navbar/search/search";
import { logoDark , logoLight } from "../../assets/logo"
import MenuMobile from "../../components/navbar/MenuMobile";

let NavBar = () => {
    const { token , isLogin , user } = useSelector(state => state.user);
    const { mode } = useSelector(state => state.darkMode);
    const disPatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getdata = async () => {
            try {
                if (!token) return;
                const response = await AXIOS_CLIENT.get('/auth/user');
                disPatch(setCurrentUser(response.data.profile));
            } catch (error) {
                if (error?.response?.status === 401) {
                    sessionStorage.removeItem('currentToken');
                    disPatch(setToken(''));
                    disPatch(setLoginOut(false));
                    toast.error('Login failed', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }
        };
        getdata();
    }, [token, disPatch]);


    const loginOut = () => {
        sessionStorage.removeItem('currentToken');
        disPatch(setToken(''));
        disPatch(setLoginOut(false));
        disPatch(setCurrentUser(null));
        toast.success('Logged out successfully', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        navigate('/login')
    }

    const darkMode = ()=>{
        sessionStorage.setItem('dark-mode',!mode)
        disPatch(setDarkMode(!mode))
    }

    return (
        <nav className="navbar">
            <div className="container m-auto container-nav">
                <div className="left">
                    <Link className="logo">
                        <img src={mode ? logoDark : logoLight} alt="" />
                        <div data-logo="NetMERN"><span>NetMERN</span></div>
                    </Link>
                    <div className="btn_menu">
                            { <MenuMobile />}
                        <button onClick={darkMode} className="toggle-theme" >
                            { mode ? <FaSun />  : <FaMoon />}
                        </button>
                    </div>
                </div>
                {
                    isLogin &&
                        <div className="center">
                            <Search />
                        </div>
                }
                <div className="right">
                    { isLogin ? <ProfileNav user={user} loginOut={loginOut} /> :<BtnConnect />}
                </div>
            </div>
        </nav>

    )
}


export default NavBar