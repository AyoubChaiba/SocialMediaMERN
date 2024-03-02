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
                    user : {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        created: user.createdAt,
                        updated: user.updatedAt,
                        avatar: `http://localhost:3000/images/${user.avatar}`,
                        followers: user.followers,
                        following: user.following,
                    },
                    publication: publications.map(publication => ({
                        id: publication._id,
                        image: publication.image ? `http://localhost:3000/images/${publication.image}` : undefined,
                        description: publication.description,
                        date_create : publication.createdAt,
                        date_update : publication.updatedAt,
                        likesUser : publication.likesUser,
                        likes : publication.likes,
                        author: {
                            id: user._id,
                            username: user.username,
                            avatar: `http://localhost:3000/images/${user.avatar}`,
                        },
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

export const updateUser = async (req, res) => {
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


export const follow = async (req, res) => {
    const { userId } = req.profile;
    const { id } = req.params;
    try {
        const user = await Profile.findById(id);
        if (!user) {
            return res.status(404).json({
            message: "User not found",
            });
        }
        user.followers.addToSet(userId);
        await user.save();
        const profile = await Profile.findById(userId);
        profile.following.addToSet(id);
        await profile.save();
        res.json({
            message: "Followed user successfully"
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

export const unFollow = async (req, res) => {
    const { userId } = req.profile;
    const { id } = req.params;
    try {
        const user = await Profile.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.followers.pull(userId);
        await user.save();
        const profile = await Profile.findById(userId);
        profile.following.pull(id);
        await profile.save();
        res.json({ message: 'UnFollowed user successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
};

export const getPeople = async (req, res) => {
    const { userId } = req.profile;
    try {
        const user = await Profile.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const followingIds = user.following.map((follower) => follower._id);
        followingIds.push(userId)
        console.log(followingIds)
        const people = await Profile.find({ _id: { $nin: followingIds } }, 'username avatar');
    return  res.json({
        people : people.map((person) => {
            return {
                id : person.id,
                username : person.username,
                avatar : `http://localhost:3000/images/${person.avatar}`,
            }
        })
    });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};



