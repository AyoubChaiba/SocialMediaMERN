import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import { Home, Settings, Login, Register } from "../pages/index";

import FeedHome from '../components/widgets/FeedHome';
import FavoritePost from '../components/widgets/favoritePost';
import EditPost from '../components/widgets/editPost';
import Profile from '../components/widgets/profile';
import EditProfile from './../components/widgets/editProfile';

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <Home />,
                children: [
                    {
                        path: '/',
                        element: <FeedHome />
                    },
                    {
                        path: '/saved',
                        element: <FavoritePost />
                    },
                    {
                        path: '/edit/:id',
                        element: <EditPost />
                    },
                    {
                        path: '/:username',
                        element: <Profile />
                    }
                ]
            },
            {
                element: <Settings />,
                children: [
                    {
                        path: '/settings',
                        element: <EditProfile active={'profile'} />,
                    },
                    {
                        path: '/security',
                        element: <EditProfile active={'security'} />,
                    }
                ]
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '*',
                element: 'not found this page'
            }
        ]
    }
]);
