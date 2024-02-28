import { Routes, Route, Link, useMatch, useResolvedPath } from "react-router-dom";
import { ProfileCard } from '../../components';
import FeedHome from '../../components/widgets/FeedHome';
import EditPost from "../../components/widgets/editPost";
import FavoritePost from "../../components/widgets/favoritePost";
import './home.scss';
import { FaHouse, FaPanorama, FaBookmark, FaUsers } from "react-icons/fa6";
import PropTypes from "prop-types";
import Profile from "../../components/widgets/profile";

const Home = () => {
    return (
        <div className="home container mx-auto">
            <div className="left">
                <ProfileCard />
                <hr />
                <ul className="link">
                    <li>
                        <CustomLink to={'/'}><FaHouse />Home</CustomLink>
                    </li>
                    <li>
                        <CustomLink to={'/saved'}><FaBookmark />Saved</CustomLink>
                    </li>
                    <li>
                        <CustomLink to={'/explore'}><FaPanorama />Explore</CustomLink>
                    </li>
                    <li>
                        <CustomLink to={'/people'}><FaUsers />People</CustomLink>
                    </li>
                </ul>
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

const CustomLink = ({ to, children }) => {
    let resolvedPath = useResolvedPath(to);
    let isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <Link className={`${isActive ? 'active' : ''}`} to={to}>
            {children}
        </Link>
    );
};

CustomLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Home;
