import Profile from '../models/Profile.js' ;
import Publication from '../models/publication.js';
import mongoose from 'mongoose';


export const getUser = async (req, res) => {
    try {
        let username = req.params.username;
        let user = await Profile.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        } else {
            let publications = await Publication.find({ author: user._id });
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
                        image: publication.image ? `http://localhost:3000/images/${publication.image}` : undefined,
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
}

export const uodateUser = async (req, res) => {
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
}

export const favoritePost = async (req, res) => {
    const { postID } = req.query;
    const { userId } = req.profile;
    const user = await Profile.findById(userId);
    const publication = await Publication.findById(postID);
    if (!user || !publication) {
        return res.status(404).json({
            message: "User or publication not found",
        });
    }
    const isAlreadySaved = user.saved.some((savedPostID) => savedPostID.toString() === postID);
    let message = "";
    if (isAlreadySaved) {
        user.saved = user.saved.filter((savedPostID) => savedPostID.toString() !== postID);
        message = "Publication removed from saved";
    } else {
        user.saved.push(postID);
        message = "Saved successfully";
    }
        await user.save();
        await publication.save();

    return res.status(200).json({
        message: message,
        data: user.saved,
    });
};


export const getFavorite = async (req, res) => {
    const { userId } = req.profile;
    const user = await Profile.findById(userId).populate("saved").sort({ createdAt: -1 });
    if (!user) return res.status(404).json({ message: "User or publication not found" });
    for (const post of user.saved) await post.populate("author");
    return res.status(200).json({
        favorite: user.saved.map((post) => {
            return {
                id: post._id,
                description: post.description,
                image: post.image ? `http://localhost:3000/images/${post.image}` : undefined,
                date_create: post.createdAt,
                date_update: post.updatedAt,
                author: {
                    id: post.author._id,
                    username: post.author.username,
                    avatar: `http://localhost:3000/images/${post.author.avatar}`,
                }
            };
        }),
    });
};
