import SerachResult from "./serachResult";
import { PropTypes } from 'prop-types';

const SearchBarList = ({ publications, tags, people }) => {

    return (
        <div className="searchList">
            {
                publications.length > 0  && (<>
                    <h2>publications</h2>
                    <ul className="card-post">
                        {
                            publications.map( item => {
                                return (
                                    <SerachResult key={item.id}
                                        text={item.description}
                                        image={item.image}
                                        author={item.author}
                                        to={`/post/${item.id}`}
                                    />
                                )
                            })
                        }
                    </ul>
                </>)
            }
            {
                people.length > 0  && (
                <>
                <h2>people</h2>
                <ul className="card-people" >
                    {
                        people.map( item => {
                            return (
                                <SerachResult key={item.id}
                                    text={item.username}
                                    image={item.avatar}
                                    to={`/${item.username}`}
                                />
                            )
                        })
                    }
                </ul>
                </>
            )}
            {
                tags.length > 0  &&
                (<>
                    <h2>tags</h2>
                    <ul className="card-tags">
                        {
                            tags.map( item => {
                                return (
                                    <SerachResult key={item.id}
                                        text={item.name}
                                        to={`/tags/${item.name}`}
                                    />
                                )
                            })
                        }
                    </ul>
                </>)
            }
        </div>

    )
}


SearchBarList.propTypes = {
    publications: PropTypes.array,
    tags: PropTypes.array,
    people: PropTypes.array,
}

export default SearchBarList