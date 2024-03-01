import { Routes, Route } from "react-router-dom";
import { ProfileCard } from '../../components';
import FeedHome from '../../components/widgets/FeedHome';
import EditPost from "../../components/widgets/editPost";
import FavoritePost from "../../components/widgets/favoritePost";
import './home.scss';
import Profile from "../../components/widgets/profile";
import SideBarLink from "../../components/widgets/sideBarLink";
import Frindes from "../../components/widgets/frindes";

const Home = () => {
    return (
        <div className="home container mx-auto">
            <div className="left">
                <ProfileCard />
                    <hr />
                <SideBarLink />
                <hr />
                <Frindes />
            </div>
            <div className="center">
                <Routes>
                    <Route path="/" element={<FeedHome />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                    <Route path="/saved" element={<FavoritePost />} />
                    <Route path="/:username" element={<Profile />} />
                </Routes>
            </div>
            <div className="right"></div>
        </div>
    );
};


export default Home;
