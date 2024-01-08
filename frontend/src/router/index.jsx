import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import {Home , Login  ,Register} from "../pages/index"


export let Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },{
                path: '/*' ,
                element : 'not found this page'
            },
            {
                path: '/login',
                element : <Login />
            },
            {
                path: '/register',
                element : <Register />
            },
            {
                path: '/edit/:id',
                element: <Home edit={true} />
            }
        ]
    }
]);