import { Outlet } from "react-router-dom";
import { ProfileCard } from '../../components';
import SideBarLink from "../../components/widgets/sideBarLink";
import "./settings.scss"

const Settings = () => {
    return (
        <div className="settings container mx-auto">
            <div className="left">
                <ProfileCard />
                    <hr />
                <SideBarLink />
            </div>
            <div className="center">
                <Outlet />
            </div>
        </div>
    );
};


export default Settings;

