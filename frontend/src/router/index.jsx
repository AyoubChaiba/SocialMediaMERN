import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import { Home, Settings, Login, Register } from "../pages/index";
import { Auth, Guest } from '../lib/middleware';

import FeedHome from '../components/widgets/FeedHome';
import FavoritePost from '../components/widgets/favoritePost';
import EditPost from '../components/widgets/editPost';
import Profile from '../components/widgets/profile';
import EditProfile from './../components/widgets/editProfile';
import PageTag from '../components/widgets/pageTag';
import PageTags from '../components/widgets/pageTags';
import ShowPost from '../components/widgets/showPost';


export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <Auth element={Home} /> ,
                children: [
                    {
                        path: '/',
                        element: <FeedHome />
                    },
                    {
                        path: '/post/:id',
                        element: <ShowPost />
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
                element: <Auth element={Settings} />,
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
                element: <Guest element={Login}/>
            },
            {
                path: '/register',
                element: <Guest element={Register} />
            },
            {
                path: '/*',
                element: 'not found this page'
            }
        ]
    }
]);
