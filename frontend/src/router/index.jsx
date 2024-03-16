import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layouts/layout';
import { Home, Settings, Login, Register } from "../pages/index";

import FeedHome from '../components/widgets/FeedHome';
import FavoritePost from '../components/widgets/favoritePost';
import EditPost from '../components/widgets/editPost';
import Profile from '../components/widgets/profile';
import EditProfile from './../components/widgets/editProfile';
import PageTag from '../components/widgets/pageTag';
import PageTags from '../components/widgets/pageTags';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, ...props }) => {
    const { user } = useSelector(state => state.user);
    return user ? <Component {...props} /> : <Navigate to="/login" replace />;
};

const PrivateLogin = ({ element: Component, ...rest }) => {
    const { user } = useSelector(state => state.user);
    return user ? <Navigate to="/" replace /> : <Component {...rest} />;
};



export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <PrivateRoute element={Home} /> ,
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
                    },
                    {
                        path: '/tags',
                        element: <PageTags />
                    },
                    {
                        path: '/tags/:name',
                        element: <PageTag />
                    },
                    {
                        path: '/people',
                        element: <FavoritePost />
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
                element: <PrivateLogin element={Login} />
            },
            {
                path: '/register',
                element: <PrivateLogin element={Register} />
            },
            {
                path: '*',
                element: 'not found this page'
            }
        ]
    }
]);
