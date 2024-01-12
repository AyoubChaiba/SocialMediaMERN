import express from 'express';
import Publication from '../models/publication.js';
import mongoose from 'mongoose';
import upload from '../middleware/upload.js' ;
import { auth } from '../middleware/auth.js';

let publicationRoute = express.Router();

publicationRoute.post('/', auth, upload.single('image'), async (req ,res)=>{
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
                    title : populatedPublication.title ,
                    description : populatedPublication.description ,
                    image : populatedPublication.image ? `http://localhost:3000/images/${populatedPublication.image}` : null ,
                    author_name : populatedPublication.author.username ,
                    author_image : `http://localhost:3000/images/${populatedPublication.author.avatar}` ,
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
})


publicationRoute.get('/', async (req,res)=>{
    try {
        const populatedPublication = await Publication.find().sort({ createdAt: -1 }).limit(50).populate('author');
        let formatPublication = populatedPublication.map( publicatin => {
            return {
                id : publicatin._id ,
                title : publicatin.title ,
                image : publicatin.image ? `http://localhost:3000/images/${publicatin.image}` : null ,
                description : publicatin.description,
                date_create : publicatin.createdAt,
                date_update : publicatin.updatedAt,
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
})

publicationRoute.get('/:id', async (req , res)=>{
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
})

publicationRoute.delete('/:id', async (req , res)=>{
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
})

publicationRoute.put( '/:id' , upload.single('image') , async (req, res) => {
    try {
        let id = req.params.id;
        let image = req?.file?.filename ;
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
});


export default publicationRoute ;