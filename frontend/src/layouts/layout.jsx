import { Outlet } from 'react-router-dom';
import { NavBar , Footer , Container } from "../container";

const Layout = () => {
    return (
        <>
        <NavBar/>
            <Container>
                <Outlet />
            </Container>
        <Footer />
        </>
    );
}

export default Layout;