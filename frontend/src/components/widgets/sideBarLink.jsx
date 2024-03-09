import PropTypes from 'prop-types'
import { Link, useMatch, useResolvedPath } from "react-router-dom";


const SideBarLink = ({ link }) => {
    return (
        <div>
            <ul className="link">
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
    let resolvedPath = useResolvedPath(to);
    let isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <Link className={`${isActive ? 'active' : ''}`} to={to}>
            {children}
        </Link>
    );
};

SideBarLink.propTypes = {
    link: PropTypes.array.isRequired,
};

CustomLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default SideBarLink