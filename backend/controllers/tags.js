import mongoose from 'mongoose';
import Tags from "../models/tags.js"
import Publication from './../models/publication.js';

export const getTags = async (req, res) => {
    try {
        const tags = await Tags.find({});
        const tagIds = tags.map(tag => new  mongoose.Types.ObjectId(tag._id));

        const publications = await Publication.find({ tags: { $in: tagIds } });

        console.log(publications)

        return res.status(200).json({
            tags: tags.map(tag => ({
                id: tag._id,
                name: tag.name
            })),
            publications: publications.map(publication => {
                return {
                    post : publication.description
                }
            })
        });
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
