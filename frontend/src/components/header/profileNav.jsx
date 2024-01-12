import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const ProfileNav = (props) => {
    const [isBtnActive, setBtnActive] = useState(false);

    return (
        <div className="relative ml-3">
        <div>
            <button
            type="button"
            onClick={() => setBtnActive((prev) => !prev)}
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            <img
                className="h-8 w-8 rounded-full"
                src={`${props.profile?.avatar}`}
                alt={props.profile?.username}
            />
            </button>
        </div>
        {isBtnActive && (
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <h3 className="py-3 text-lg text-center text-black-700">
                {props.profile?.username}
            </h3>
            <CustomLink to={"/profile"}>Your Profile</CustomLink>
            <CustomLink to={"/EditProfile"}>Settings</CustomLink>
            <button
                className="block px-4 py-2 text-sm text-gray-700"
                onClick={props.loginOut}
            >
                Sign out
            </button>
            </div>
        )}
        </div>
    );
};

const CustomLink = ({ to, children }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <Link
        className={`block px-4 py-2 text-sm text-gray-700 ${
            isActive ? "bg-gray-100" : ""
        }`}
        to={to}
        >
        {children}
        </Link>
    );
};

ProfileNav.propTypes = {
    profile: PropTypes.shape({
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