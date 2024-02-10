import PropTypes from 'prop-types';
import "./main.scss"

const Container = ({children}) => {
    return (
        <main>{children}</main>
    )
}

Container.propTypes ={
    children: PropTypes.node.isRequired,
}

export default Container