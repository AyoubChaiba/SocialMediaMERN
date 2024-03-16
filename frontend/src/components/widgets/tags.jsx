
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Tags = ({name, count}) => {
    return (
        <Link to={`/tags/${name}`}>
            <li className='tags'>{name}
                {count > 0  && <span>{count}</span>}
            </li>
        </Link>
    )
}

Tags.propTypes = {
    name: PropTypes.string,
    count: PropTypes.number,
}

export default Tags