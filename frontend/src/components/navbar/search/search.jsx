import { FaMagnifyingGlass } from "react-icons/fa6";
import "./search.scss";
import SearchBarList from "./searchList";
import { useEffect, useState } from "react";
import { AXIOS_CLIENT } from "../../../lib/api/axios";

const Search = () => {
    const [publications, setPublications] = useState([]);
    const [tags, setTags] = useState([]);
    const [people, setPeople] = useState([]);
    const [searchItems, setSearchItems] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await AXIOS_CLIENT.get(`search`, {
                    params: {
                        query: searchItems,
                    },
                });
                setPublications([...res.data.publications]);
                setTags([...res.data.tags]);
                setPeople([...res.data.people]);
            } catch (error) {
                console.log(error);
            }
        };
        searchItems.length > 0 && fetchItems();
    }, [searchItems]);

    const handleChange = async (e) => {
        const searchValue = e.target.value;
        searchValue.length >= 0 && setPublications([]);
        searchValue.length >= 0 && setTags([]);
        searchValue.length >= 0 && setPeople([]);
        setSearchItems(searchValue);
    };

    const handleToggleSuggestions = (e) => {
        e._reactName === "onFocus"  && setShowSuggestions(true)
        if (e._reactName === "onBlur"  && publications.length <= 0) setShowSuggestions(false)
    };

    return (
        <div className="search-container">
            <div className="search">
                <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchItems}
                    onChange={handleChange}
                    onFocus={handleToggleSuggestions}
                    onBlur={handleToggleSuggestions}
                />
                <FaMagnifyingGlass className="icon-search" />
            </div>
            {( showSuggestions && (publications.length >= 0 || tags.length >= 0 || people.length >= 0)) && (
                <SearchBarList
                    publications={publications}
                    tags={tags}
                    people={people}
                    handleToggleSuggestions={handleToggleSuggestions}
                    />
            )}
        </div>
    );
};

export default Search;
