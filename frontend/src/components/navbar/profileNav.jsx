import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FaUser   , FaGear , FaRightToBracket  } from "react-icons/fa6";


const ProfileNav = props => {
    const [isBtnActive, setBtnActive] = useState(false);

    return (
        <div className="UserNav">
            <button className="avatar" type="button" onClick={() => setBtnActive((prev) => !prev)} >
                <img src={`${props.user?.avatar}`} alt={props.user?.username}/>
            </button>
            {isBtnActive && (
                <div className="user_menu">
                    <h2>{props.user?.username}</h2>
                    <CustomLink to={`/${props.user?.username}`}><FaUser  />profile</CustomLink>
                    <CustomLink to={"/settings"}><FaGear/>Settings</CustomLink>
                    <li>
                        <button className='link' onClick={props.loginOut}><FaRightToBracket />Sign out</button>
                    </li>

                </div>
            )}
        </div>
    );
};

const CustomLink = ({ to, children}) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={`link ${ isActive ? "active" : ""}`}>
            <Link to={to}>{children}</Link>
        </li>
    );
};

ProfileNav.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        avatar: PropTypes.string,
    }),
    loginOut: PropTypes.func,
};

CustomLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
};

export default ProfileNav;