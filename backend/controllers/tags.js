import Tags from "../models/tags.js"
import Publication from './../models/publication.js';

export const getTags = async (req, res) => {
    try {
        const tags = await Tags.find({});
        const tagPublicationsCounts = {};
        for (const tag of tags) {
            const publications = await Publication.find({ tags: tag._id });
            tagPublicationsCounts[tag.name] = publications.length;
        }

        return res.status(200).json({
            tags: tags.map(tag => ({
                id: tag._id,
                name: tag.name,
                totalPublications: tagPublicationsCounts[tag.name]
            }))
        });
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
            { $sort: { count: -1 } }
        ]);

        const populatedTags = await Promise.all(tagCounts.map(async (tag) => {
            const populatedTag = await Tags.findById(tag._id);
            return {
                name: populatedTag.name,
                count: tag.count
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
    const { id } = req.params;
    try {
        const tag = await Tags.findById(id);
        if (!tag) {
            return res.status(404).json({
                message: "Tag not found"
            });
        }
        const publications = await Publication.find({ tags: tag._id });
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
                    author: {
                        id: post.author._id,
                        username: post.author.username,
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
