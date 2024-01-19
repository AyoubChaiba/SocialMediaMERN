import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Header , Footer , Container } from "../container";


const Layout = () => {
    return (
        <>
            <ToastContainer />
            <Header />
                <Container>
                    <Outlet />
                </Container>
            <Footer />
        </>
    );
}

export default Layout;