import { Outlet } from "react-router-dom";
import { ProfileCard } from '../../components';
import SideBarLink from "../../components/widgets/sideBarLink";
import "./settings.scss"
import { FaAddressCard, FaShieldHalved, FaHouse } from "react-icons/fa6";


const Settings = () => {
    return (
        <div className="settings container mx-auto">
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
                            path: '/settings',
                            icon: <FaAddressCard />,
                            text: 'Edit profile'
                        },
                        {
                            path: '/security',
                            icon: <FaShieldHalved />,
                            text: 'Security'
                        }
                    ]} />
            </div>
            <div className="center">
                <Outlet />
            </div>
        </div>
    );
};


export default Settings;

