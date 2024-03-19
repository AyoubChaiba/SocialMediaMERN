import Tags from "../models/tags.js"
import Publication from './../models/publication.js';

export const getTags = async (req, res) => {
    try {
        const { limit , page } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const tags = await Tags.find({}).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 });

        const tagPublicationsCounts = {};
        for (const tag of tags) {
            const publications = await Publication.find({ tags: tag._id });
            tagPublicationsCounts[tag.name] = publications.length;
        }

        return res.status(200).json(
            tags.map(tag => ({
                id: tag._id,
                name: tag.name,
                count: tagPublicationsCounts[tag.name],
                date_created: tag.createdAt,
            }))
        );
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};


export const getPopularTags = async (req, res) => {
    try {
        const tagCounts = await Publication.aggregate([
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {$limit: 12}
        ]);

        const populatedTags = await Promise.all(tagCounts.map(async (tag) => {
            const populatedTag = await Tags.findById(tag._id);
            return {
                id: populatedTag._id,
                name: populatedTag.name,
                count: tag.count,
                date_created: populatedTag.createdAt,
            };
        }));

        return res.status(200).json(populatedTags);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};


export const getTag = async (req, res) => {
    const { name } = req.params;
    try {
        const tag = await Tags.findOne({ name: name });
        if (!tag) {
            return res.status(404).json({
                message: "Tag not found"
            });
        }
        const publications = await Publication.find({ tags: tag._id })
        .populate('author')
        .populate('tags').sort({ createdAt : -1});
        return res.status(200).json({
            tag: {
                id: tag._id,
                name: tag.name
            },
            publications: publications.map(post => {
                return {
                    id: post._id,
                    description: post.description,
                    image: post.image? `http://localhost:3000/image/${post.image}` : undefined,
                    date_create: post.createdAt,
                    tags: post.tags.map(e => ({ id: e._id, name: e.name })),
                    author: {
                        id: post.author._id,
                        fullName: post.author.fullName,
                        username: post.author.username,
                        avatar: `http://localhost:3000/avatar/${post.author.avatar}`,
                    }
                }
            })
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};
