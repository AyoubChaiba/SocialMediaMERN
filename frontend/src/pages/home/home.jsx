import { Outlet } from "react-router-dom";
import { ProfileCard } from '../../components';
import './home.scss';
import SideBarLink from "../../components/widgets/sideBarLink";
import Friends from "../../components/widgets/friends";
import People from "../../components/widgets/people";

const Home = () => {
    return (
        <div className="home container mx-auto">
            <div className="left">
                <ProfileCard />
                    <hr />
                <SideBarLink />
                    <hr />
                <Friends />
            </div>
            <div className="center">
                <Outlet />
            </div>
            <div className="right">
                <People />
            </div>
        </div>
    );
};


export default Home;
