import { useEffect, useState } from "react"
import { AXIOS_CLIENT } from "../../lib/api/axios";
import CardPeople from "./CardPeople";
import { useSelector } from 'react-redux';

const People = () => {
    const [people, setPeople] = useState([]);
    const { user } = useSelector( state => state.user );

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
                    <CardPeople  key={person.id}
                        id={person.id}
                        username={person.username}
                        avatar={person.avatar}
                        user={user}
                    />
                ))}
            </ul>
        </div>
    );
}

export default People