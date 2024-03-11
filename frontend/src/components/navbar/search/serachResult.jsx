
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const SerachResult = ({ text, image , author, to }) => {
    return (
        <Link to={to} >
            <li>
                {image && <img src={image} alt={text} />}
                <div>
                    <p>{text}</p>
                    {author && <span>{author}</span>}
                </div>
            </li>
        </Link>
    )
}

SerachResult.propTypes = {
    text: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    to: PropTypes.string
}


export default SerachResult