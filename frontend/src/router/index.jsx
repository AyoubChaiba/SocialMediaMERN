import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import { Home, Profile } from "../pages/index";
import Login from "../auth/login";
import Register from "../auth/register";
import EditProfilePage from '../pages/profile/EditProfilePage';
import { useSelector } from 'react-redux';

export const Router = () => {
    const isLogin = useSelector(state => state.profile.isLogin);

    const routes = [
        {
            path: '/',
            element: isLogin ? <Home /> : <Login />
        },
        {
            path: '/login',
            element: isLogin ? <Home /> : <Login />
        },
        {
            path: '/register',
            element: isLogin ? <Home /> : <Register />
        },
        {
            path: '/edit/:id',
            element: isLogin ? <Home /> : <Login />
        },
        {
            path: '/EditProfile',
            element: isLogin ? <EditProfilePage /> : <Login />
        },
        {
            path: '/profile/:username',
            element: isLogin ? <Profile /> : <Login />
        },
        {
            path: '/*',
            element: 'not found this page'
        }
    ];

    return createBrowserRouter([
        {
            element: <Layout />,
            children: routes
        }
    ]);
};

