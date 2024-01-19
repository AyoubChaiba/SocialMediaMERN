import { Link, useMatch, useResolvedPath } from "react-router-dom"
export const ListLink = () => {
    return (
        <div className="flex space-x-4">
            <CustomLink to={'/'}>bro</CustomLink>
            <CustomLink to={'/register'}>register</CustomLink>
            <CustomLink to={'/login'}>login</CustomLink>
        </div>
    )
}

let CustomLink = ({ to, children, ...props }) => {
    let resolvedPath = useResolvedPath(to);
    let isActive = useMatch({ path: resolvedPath.pathname, end: true });
        return (
        <Link className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium 
        ${isActive ? 'bg-gray-900 text-white' : ''}`} to={to} {...props} >
            {children}
        </Link>
        );
};
