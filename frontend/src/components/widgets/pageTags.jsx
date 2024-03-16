import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../lib/api/axios";
import { Link } from "react-router-dom";
import { FaRegCircleRight, FaRegCircleLeft } from "react-icons/fa6";


const PageTags = () => {
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [tagsPopular, setTagsPopular] = useState([]);
    const [page, setPage] = useState(1);

    const time = data => {
        const timeDifference = new Date() - new Date(data);
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        switch (true) {
            case seconds < 60:
                return `${seconds}s`;
            case minutes < 60:
                return `${minutes}m`;
            case hours < 24:
                return `${hours}h`;
            default:
                return `${days}d`;
        }
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                const response = await AXIOS_CLIENT.get(`/tags?limit=${12}&page=${page}`);
                setTags(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, [page]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                const { data } = await AXIOS_CLIENT.get(`tags/popular/tags`);
                console.log(data)
                setTagsPopular(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, [page]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            <h1>All Tags</h1>
            <div className="tags-container">
                <ul className="list-tags">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        tags.map(tag => (
                            <Link to={`${tag.name}`} key={tag._id}>
                                <li className="tag-item">
                                    <h1>#{tag.name}</h1>
                                    {tag.count > 0  && <span className="count">{tag.count}</span>}
                                    <span className="date">{time(tag.date_created)}</span>
                                </li>
                            </Link>
                        ))
                    )}
                </ul>
                <div className="btn-list-tags">
                    <button onClick={handlePrevPage} className="prev" disabled={page === 1}><FaRegCircleLeft /></button>
                    <button onClick={handleNextPage} className="next" disabled={tags.length < 12} ><FaRegCircleRight /></button>
                </div>
            </div>
            <h1>Popular</h1>
            <div className="tags-container">
                <ul className="list-tags">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        tagsPopular.map(tag => (
                            <Link to={`${tag.name}`} key={tag._id}>
                                <li className="tag-item">
                                    <h1>#{tag.name}</h1>
                                    {tag.count > 0  && <span className="count">{tag.count}</span>}
                                    <span className="date">{time(tag.date_created)}</span>
                                </li>
                            </Link>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default PageTags;
