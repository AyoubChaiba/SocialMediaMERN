import { Routes, Route } from "react-router-dom";
import { ProfileCard } from '../../components';
import FeedHome from '../../components/widgets/FeedHome';
import EditPost from "../../components/widgets/editPost";
import './home.scss';

const Home = () => {
    return (
        <div className="home container mx-auto">
            <div className="left">
                <ProfileCard />
                <hr />
            </div>
            <div className="center">
                <Routes>
                    <Route path="/" element={<FeedHome />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                    <Route path="/save" element={<EditPost />} />
                </Routes>
            </div>
            <div className="right"></div>
        </div>
    );
};

export default Home;
