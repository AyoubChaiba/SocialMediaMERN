import express from 'express' ;
import Profile from '../models/Profile.js' ;
import Publication from '../models/publication.js';
import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {auth} from '../middleware/auth.js'
import upload from '../middleware/upload.js';

dotenv.config()

let profileRoute = express.Router();

let {JWT_SECRET} = process.env;

profileRoute.get('/user', auth , async (req ,res) => {
    try {
        let id = req.profile.userId
        let User = await Profile.findOne({_id : id});
        if (!User) {
            return res.status(404).json({
                message : "User not found"
            })
        } else {
            return res.status(200).json({
                message : "user is found",
                profile : {
                    id : User._id ,
                    username : User.username ,
                    email : User.email ,
                    created : User.createdAt ,
                    update : User.updatedAt ,
                    avatar : `http://localhost:3000/images/${User.avatar}` ,
                }
            })
        }
    } catch (e) {
        return res.status(500).json({
            message : e.message
        })
    }
} )

profileRoute.get('/:username', auth, async (req, res) => {
    try {
        let username = req.params.username;
        let user = await Profile.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        } else {
            let publications = await Publication.find({ author: user._id });
            console.log(publications);

            return res.status(200).json({
                message: "User found",
                profile: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    created: user.createdAt,
                    updated: user.updatedAt,
                    avatar: `http://localhost:3000/images/${user.avatar}`,
                    publication: publications.map(publication => ({
                        id: publication._id,
                        title: publication.title,
                        image: publication.image ? `http://localhost:3000/images/${publication.image}` : null,
                        description: publication.description,
                        date_create: publication.createdAt,
                        date_update: publication.updatedAt,
                    }))
                }
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
});


profileRoute.put( '/:id' , auth , upload.single('avatar') , async (req ,res) => {
    try {
        let id = req.params.id;
        let avatar = req?.file?.filename;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message : "User not found"
            })
        }
        let {username, email} = req.body;
        const data = avatar ? {username, email , avatar} : {username, email}
        let User = await Profile.findByIdAndUpdate(id,data, {new : true, runValidators: true});
        if (!User) {
            return res.status(404).json({ message: 'update profile not working' });
        };
        return res.status(200).json({
            message : "updated successfully profile",
            profile : {
                id : User._id ,
                username : User.username ,
                email : User.email ,
                created : User.createdAt ,
                update : User.updatedAt ,
                avatar : `http://localhost:3000/images/${User.avatar}` ,
            }
        })
    } catch (e) {
        return res.status(500).json({
            messagex : e.message
        })
    }
} )

// upload.single('avatar')

profileRoute.post('/register' , async (req ,res) => {
    try {
        let {username , email , password} = req.body
        if (!username, !email, !password) {
            return res.status(422).json({
                message : "All the fields are required."
            })
        }
        let existEmail = await Profile.findOne({email});
        let existUsername = await Profile.findOne({username});
        if (existEmail || existUsername) {
            return res.status(422).json({
                username : existUsername ? "username already" : "username is valid" ,
                email : existEmail ? "email already" : "email is valid" ,
            })
        }
        let hashPssword = await bcrypt.hash(password ,10)
        let  profile = new Profile({username , email ,password : hashPssword});
        profile.avatar = `default-avatar-image.jpg`
        // if (req.file) {
        //     profile.avatar = req.file.path
        // }
        let create = await profile.save();
        if (create) {
            return res.status(200).send({
                message : "User created successfully.",
                user : {
                    id : profile._id ,
                    email : profile.email ,
                    username : profile.username ,
                    avatar : `http://localhost:3000/images/${profile.avatar}`
                }
            })
        }else {
            return res.status(500).send({message : "error creating profile"});
        }
    } catch (e) {
        return res.status(500).json({
            message : e.message
        })
    }
} )

profileRoute.post('/login', async (req ,res) => {
    try {
        let {username , password} = req.body
        let  profile = await Profile.findOne({username});
        if (profile) {
            let isMatch = await bcrypt.compare(password, profile.password);
            if (isMatch) {
                let token = jwt.sign({userId : profile._id} , JWT_SECRET , {expiresIn : "2d"});
                return res.status(200).json({
                    message : "User logged in successfully.",
                    profile : {
                        _id : profile._id,
                        username : profile.username,
                        email : profile.email
                    },
                    token : token
                })
            }else {
                return res.status(422).json({
                    message : "username or password is incorrect"
                })
            }
        } else {
            return res.status(422).json({
                message : "username or password is incorrect"
            })
        }
    } catch (e) {
        return res.status(500).json({
            message : e.message
        })
    }
} )



export default profileRoute
