import { useEffect, useState } from "react"
import { AXIOS_CLIENT } from "../../lib/api/axios";

const People = () => {
    let [people, setPeople] = useState([]);
    useEffect(() => {
    const fetchPeople = async () => {
        try {
            const response = await AXIOS_CLIENT.get(`/users/people/follow`);
            setPeople(response.data.people);
        } catch (error) {
            console.log(error);
        }
        };
        fetchPeople();
    }, []);

return (
    <div className="list-people">
        <ul className="list-group">
            {people.map((person) => (
                <li key={person.id}>
                    <img src={person.avatar} alt={person.username} />
                    <h2>{person.username}</h2>
                    <button>follow</button>
                </li>
            ))}
        </ul>
    </div>
);
}

export default People