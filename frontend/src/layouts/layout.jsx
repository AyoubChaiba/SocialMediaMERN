import { Outlet } from 'react-router-dom';
import { NavBar , Container } from "../container";

const Layout = () => {
    return (
        <Container>
            <NavBar/>
            <Outlet />
        </Container>
    );
}

export default Layout;