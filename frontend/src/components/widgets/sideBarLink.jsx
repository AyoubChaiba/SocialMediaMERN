import { FaHouse, FaBookmark, FaUsers, FaHashtag } from "react-icons/fa6";
import PropTypes from 'prop-types'
import { Link, useMatch, useResolvedPath } from "react-router-dom";


const SideBarLink = () => {
    return (
        <div>
            <ul className="link">
                <li>
                    <CustomLink to={'/'}><FaHouse />Home</CustomLink>
                </li>
                <li>
                    <CustomLink to={'/saved'}><FaBookmark />Saved</CustomLink>
                </li>
                <li>
                    <CustomLink to={'/explore'}><FaHashtag />Tags</CustomLink>
                </li>
                <li>
                    <CustomLink to={'/people'}><FaUsers />People</CustomLink>
                </li>
            </ul>
        </div>
    )
}

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

export default SideBarLink