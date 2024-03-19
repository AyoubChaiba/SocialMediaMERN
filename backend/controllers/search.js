import Publication from '../models/publication.js';
import Tags from '../models/tags.js';
import Profile from '../models/Profile.js';

export const search = async (req, res) => {
    try {
        const { query } = req.query;

        const publications = await Publication.find({
            description: { $regex: new RegExp(query, 'i') }
        }).populate('author').limit(5);

        const profiles = await Profile.find({
            $or: [
                { username: { $regex: new RegExp(query, 'i') } },
                { email: { $regex: new RegExp(query, 'i') } }
            ]
        }).limit(5);

        const tags = await Tags.find({
            name: { $regex: new RegExp(query, 'i') }
        }).limit(5);

        return res.status(200).json({
            publications : publications.map(e => {
                return {
                    id: e._id,
                    image: e.image? `http://localhost:3000/image/${e.image}` : undefined,
                    description: e.description.slice(0, 100),
                    author: e.author.username,
                }
            }) ,
            people : profiles.map(e => {
                return {
                    id: e._id,
                    fullName: e.fullName,
                    username: e.username,
                    avatar: `http://localhost:3000/avatar/${e.avatar}`,
                }
            }),
            tags : tags.map(e => {
                return {
                    id: e._id,
                    name: e.name,
                }
            })
        });
    } catch (err) {
        console.error('An error occurred', err);
        return res.status(500).json({
            message: err.message,
        });
    }
}