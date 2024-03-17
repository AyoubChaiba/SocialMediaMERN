import { useEffect, useState } from "react"
import { AXIOS_CLIENT } from "../../lib/api/axios";
import Tags from "./tags";

const SidBarTags = () => {
    const [popularTags, setPopularTags] = useState([]);
    const [tags, settags] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`tags/popular/tags`);
                setPopularTags(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPeople();
    }, []);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await AXIOS_CLIENT.get(`tags`);
                settags(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPeople();
    }, []);


    return (
        <div className="list-tags">
            <h2>popular</h2>
            <ul className="list-group">
                {
                    popularTags.map((tag) => (
                        <Tags key={tag.id}
                            id={tag.id}
                            name={tag.name}
                            count={tag.count}
                        />
                    ))
                }
            </ul>
            <h2>all Tags</h2>
            <ul className="list-group">
                {
                    tags.map((tag) => (
                        <Tags key={tag.id}
                            id={tag.id}
                            name={tag.name}
                            count={tag.count}
                        />
                    ))
                }
            </ul>
        </div>
    );
}

export default SidBarTags