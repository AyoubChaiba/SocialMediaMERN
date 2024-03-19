import PropTypes from 'prop-types'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useSelector } from 'react-redux';


const SideBarLink = ({ link, className  }) => {
    return (
        <div>
            <ul className={className}>
                {
                    link.map((item, index) => {
                        return (
                            <li key={index}>
                                <CustomLink to={item.path}>{item.icon}{item.text}</CustomLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const CustomLink = ({ to, children }) => {
    const { user  } = useSelector(state => state.user)
    let resolvedPath = useResolvedPath(to);
    let isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <Link className={`${isActive ? 'active' : ''}`} to={to}>
            {children}
            {to === "/saved" && <span>{user?.favorite?.length}</span>}
        </Link>
    );
};

SideBarLink.propTypes = {
    link: PropTypes.array.isRequired,
    className: PropTypes.string
};

CustomLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default SideBarLink