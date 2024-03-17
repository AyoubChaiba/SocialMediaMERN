import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Auth = ({ element: Component, ...props }) => {
    const { isLogin } = useSelector(state => state.user);
    return isLogin ? <Component {...props} /> : <Navigate to="/login" replace />;
};

export const Guest = ({ element: Component, ...rest }) => {
    const { isLogin } = useSelector(state => state.user);
    return isLogin ? <Navigate to="/" replace /> : <Component {...rest} />;
};

Auth.propTypes = {
    element: PropTypes.func.isRequired,
}
Guest.propTypes = {
    element: PropTypes.func.isRequired,
}