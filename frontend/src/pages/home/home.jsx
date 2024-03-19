import { Outlet } from "react-router-dom";
import { ProfileCard } from '../../components';
import './home.scss';
import SideBarLink from "../../components/widgets/sideBarLink";
import Friends from "../../components/widgets/friends";
import People from "../../components/widgets/people";
import { FaHouse, FaBookmark, FaUsers, FaHashtag } from "react-icons/fa6";
import SidBarTags from "../../components/widgets/sidBarTags";
const Home = () => {
    return (
        <div className="home container mx-auto">
            <div className="left">
                <ProfileCard />
                    <hr />
                <SideBarLink className={"link"} link={[
                    {
                        path: '/',
                        icon: <FaHouse />,
                        text: 'Home'
                    },
                    {
                        path: '/saved',
                        icon: <FaBookmark />,
                        text: 'Saved'
                    },
                    {
                        path: '/tags',
                        icon: <FaHashtag />,
                        text: 'Tags'
                    },
                    {
                        path: '/people',
                        icon: <FaUsers />,
                        text: 'People'
                    }
                ]} />
                    <hr />
                <Friends />
            </div>
            <div className="center">
                <Outlet />
            </div>
            <div className="right">
                <People />
                <SidBarTags />
            </div>
        </div>
    );
};


export default Home;
