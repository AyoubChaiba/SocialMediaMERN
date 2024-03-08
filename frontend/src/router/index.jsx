import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import { Home, Settings, Login, Register } from "../pages/index";

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
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/*',
                element: 'not found this page'
            }
        ]
    }
]);
