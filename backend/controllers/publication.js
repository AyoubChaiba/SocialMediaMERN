import Publication from '../models/publication.js';
import mongoose from 'mongoose';

export const getPublications = async (req,res)=> {
    try {
        const populatedPublication = await Publication.find().sort({ createdAt: -1 }).limit(50).populate('author');
        let formatPublication = populatedPublication.map( publicatin => {
            return {
                id : publicatin._id ,
                image : publicatin.image ? `http://localhost:3000/images/${publicatin.image}` : undefined ,
                description : publicatin.description,
                date_create : publicatin.createdAt,
                date_update : publicatin.updatedAt,
                likes : publicatin.likes,
                author : {
                    id : publicatin.author._id ,
                    username : publicatin.author.username ,
                    avatar : `http://localhost:3000/images/${publicatin.author.avatar}` ,
                }
            }
        })
        return res.status(200).json({
            data : formatPublication
        });
    } catch (err) {
        console.error("An error occurred" ,err);
        return res.status(500).json({
            message : err.message
        })
    }
}

export const getPublication = async (req,res)=> {
    try {
        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json(
                {
                    message : "invalid publicatin id"
                }
            )
        }
        let publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({ message: 'publication not found'})
        } ;
        return res.status(200).json({
            id : publication.id ,
            title : publication.title ,
            description : publication.description ,
            image : `http://localhost:3000/images/${publication.image}`
        });
    } catch (error) {
        console.error("An error occurred" , error);
        return res.status(500).json({
            message : error.message
        })
    }
}

export const CreatePublication = async (req,res)=> {
    try {
        let { title , description  } = req.body;
        let author = req.profile
        let image = req?.file?.filename ;

        let publication = new Publication({
            title,
            description ,
            author : author.userId ,
        })

        if (image) publication.image = image ;

        const savePublication = await publication.save();

        if (savePublication) {
            const populatedPublication = await Publication.findById(publication._id).populate('author');
            return res.status(200).json({
                message : 'Publication created successfully.' ,
                publication : {
                    id : populatedPublication._id ,
                    description : populatedPublication.description ,
                    image : populatedPublication.image ? `http://localhost:3000/images/${populatedPublication.image}` : undefined ,
                    date_create : populatedPublication.createdAt,
                    date_update : populatedPublication.updatedAt,
                    likes : populatedPublication.likes,
                    author : {
                        id : populatedPublication.author._id ,
                        username : populatedPublication.author.username ,
                        avatar : `http://localhost:3000/images/${populatedPublication.author.avatar}` ,
                    }
                }
            });
        }else {
            return res.status(401).json({
                message : 'Failed Creating Publication' ,
            });
        }

    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
}

export const editPublication = async (req,res)=> {
    try {
        let id = req.params.id;
        let image = req?.file?.filename;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message : "invalid publication id"
            })
        }
        let { title, description} = req.body;
        let data = image ? {title , description ,image} : {title , description}
        let publication = await Publication.findByIdAndUpdate(id,data,{new : true , runValidators: true});
        if (!publication) {
            return res.status(404).json({ message: 'publication not found'})
        };
        return res.status(200).json({
            message : "this publication is updated successfully" ,
            id : publication.id ,
            title : publication.title ,
            description : publication.description ,
        });
    } catch (error) {
        console.error("An error occurred", error);
        return res.status(500).json({
            message : error.message
        })
    }
}

export const deletePublication = async (req,res)=> {
    try {
        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message : "invalid publication id"
            })
        }
        let publication = await Publication.findByIdAndDelete(id);
        if (!publication) {
            return res.status(404).json({ message: 'id not found'})
        } ;
        return res.status(200).json({
            title : publication.title,
            id : publication.id ,
            message : "this publication is deleted successfully"
        });
    } catch (error) {
        console.error("An error occurred" , error);
        return res.status(500).json({
            message : error.message
        })
    }
}

export const likePublication = async (req, res) => {
    const { postID, userID } = req.query;
    try {
        let publication = await Publication.findById(postID);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }
        const userLiked = publication.likes.some(like => like === userID);
        if (userLiked) {
            publication.likes = publication.likes.filter(like => like !== userID);
        }else {
            publication.likes.push(userID);
        }
        await publication.save();
        res.json({ success: true, likes: publication.likes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

