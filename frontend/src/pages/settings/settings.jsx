import { Routes, Route } from "react-router-dom";
import { ProfileCard } from '../../components';
import SideBarLink from "../../components/widgets/sideBarLink";
import "./settings.scss"
import SettingProfile from './../../components/widgets/editProfile';

const Settings = () => {
    return (
        <div className="settings container mx-auto">
            <div className="left">
                <ProfileCard />
                    <hr />
                <SideBarLink />
            </div>
            <div className="center">
                <Routes>
                    <Route path="/" element={<SettingProfile />} />
                </Routes>
            </div>
        </div>
    );
};


export default Settings;

