// import { ListLink } from "./ListLink";
// import { FaBars } from "react-icons/fa6";
// import Notification from "./notification"
import ProfileNav from "../../components/navbar/profileNav";
import BtnConnect from "../../components/navbar/btnConnect";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { setLoginOut , setCurrentProfile , setToken } from "../../toolkit/profileSlice";
import { toast } from 'react-toastify'
import { useNavigate , Link } from "react-router-dom";
import { AXIOS_CLIENT } from "../../api/axios";
import { FaMoon , FaSun , FaHouse } from "react-icons/fa6";
import "./NavBar.scss"
import { setDarkMode } from "../../toolkit/darkModeSlice";

let NavBar = () => {
    const { token , isLogin , profile } = useSelector(state => state.profile);
    const { mode } = useSelector(state => state.darkMode);
    const disPatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getdata = async () => {
            try {
                if (!token) return;
                const response = await AXIOS_CLIENT.get('/auth/user');
                disPatch(setCurrentProfile(response.data.profile));
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
    }, [token]);


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

    const darkMode = ()=>{
        sessionStorage.setItem('dark-mode',!mode)
        disPatch(setDarkMode(!mode))
    }

    return (
        <nav className="navbar">
            <div className="container m-auto">
                <div className="left">
                    <div>
                        <h1>Logo</h1>
                    </div>
                    <div className="btn_menu">
                        <Link to={'/'}>
                            { <FaHouse />}
                        </Link>
                        <button onClick={darkMode}>
                            { mode ? <FaSun />  : <FaMoon />}
                        </button>
                    </div>
                </div>
                <div className="search">
                    <input type="search" />
                </div>
                <div className="right">
                    { isLogin ? <ProfileNav profile={profile} loginOut={loginOut} /> :<BtnConnect />}
                </div>
            </div>
        </nav>

    )
}


export default NavBar