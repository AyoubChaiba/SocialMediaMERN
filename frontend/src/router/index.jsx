import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import { Home } from "../pages/index";
import Login from "../auth/login";
import Register from "../auth/register";
// import EditProfilePage from '../pages/profile/EditProfilePage';

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/*',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            // {
            //     path: '/EditProfile',
            //     element: <EditProfilePage />
            // },
            // {
            //     path: '/profile/:username',
            //     element: <Profile />
            // },
            {
                path: '/*',
                element: 'not found this page'
            }
        ]
    }
]);
