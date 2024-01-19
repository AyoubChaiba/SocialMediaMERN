import PropTypes from 'prop-types';

const Container = ({children}) => {
    return (
        <main className="bg-gray-100 min-h-screen">
            {children}
        </main>
    )
}

Container.propTypes ={
    children: PropTypes.node.isRequired,
}

export default Container