import { useState } from "react";
import { FaHouse, FaBookmark, FaUsers, FaHashtag } from "react-icons/fa6";
import {  FaBarsStaggered, FaX  } from "react-icons/fa6";
import SideBarLink from "../widgets/sideBarLink";


const MenuMobile = () => {
    const [isBtnActive, setBtnActive] = useState(false);

    return (
        <div className="menu-container">
            <button className="icon" onClick={() => setBtnActive((prev) => !prev)} >
                {  !isBtnActive ? <FaBarsStaggered /> : <FaX />}
            </button>
            {isBtnActive && (
                <SideBarLink className="menu-mobile" link={[
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
            )}
        </div>
    );
};

export default MenuMobile;