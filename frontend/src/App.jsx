import { RouterProvider } from 'react-router-dom';
import { Router } from './router/index';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import "./scss/app.scss";

const App = () => {
    const { mode } = useSelector(state => state.darkMode);
    return (
        <div className={`theme-${mode ? "dark" : "light"}`}>
            <ToastContainer />
            <RouterProvider router={Router()} />
        </div>
    );
}

export default App;
