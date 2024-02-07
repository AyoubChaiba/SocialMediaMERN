import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Header , Footer , Container } from "../container";
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theme';



const Layout = () => {
    return (
        <>
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Header />
                <Container>
                    <Outlet />
                </Container>
            <Footer />
        </ThemeProvider>
        </>
    );
}

export default Layout;