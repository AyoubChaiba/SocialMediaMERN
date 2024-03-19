import Profile from '../models/Profile.js' ;
import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {OAuth2Client} from  'google-auth-library'

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

export const User = async (req,res) => {
    try {
        let id = req.profile.userId
        let User = await Profile.findOne({_id : id}).populate('followers').populate('following');
        if (!User) {
            return res.status(404).json({
                message : "User not found"
            })
        } else {
            return res.status(200).json({
                message : "user is found",
                profile : {
                    id : User._id ,
                    fullName: User.fullName,
                    username : User.username ,
                    email : User.email ,
                    created : User.createdAt ,
                    update : User.updatedAt ,
                    avatar : `http://localhost:3000/avatar/${User.avatar}` ,
                    favorite : User.saved,
                    followers: User.followers.map(e => {
                        return {
                            id: e._id,
                            username: e.username,
                            avatar: `http://localhost:3000/avatar/${e.avatar}`,
                        }
                    }),
                    following: User.following.map(e => {
                        return {
                            id: e._id,
                            username: e.username,
                            avatar: `http://localhost:3000/avatar/${e.avatar}`,
                        }
                    }),
                }
            })
        }
    } catch (e) {
        return res.status(500).json({
            message : e.message
        })
    }
}

export const updatePassword = async (req, res) => {
    const { userId } = req.profile;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await Profile.findOne({ _id : userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) return res.status(401).json({ message: 'Incorrect old password' });
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await Profile.updateOne({ _id: userId }, { password: hashedPassword })
        return res.status(200).json({ message: 'Password updated successfully' });
    }catch (e) {
        return res.status(500).json({
            message :  e.message
        })
    }
}

export const Login = async (req,res) => {
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
                        fullName: profile.fullName,
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
}

export const Register = async (req,res) => {
    try {
        let {firstName, lastName, username , email , password} = req.body
        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(422).json({
                message: "All fields are required."
            });
        }
        let existingUser = await Profile.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(422).json({
                username: existingUser.username === username ? "Username already exists." : "Username is valid.",
                email: existingUser.email === email ? "Email already exists." : "Email is valid."
            });
        }
        const fullName = `${firstName} ${lastName}`
        let hashPssword = await bcrypt.hash(password ,10)
        let  profile = new Profile({fullName, username, email, password: hashPssword});
        // profile.avatar = `default-avatar-image.jpg`
        // if (req.file) {
        //     profile.avatar = req.file.path
        // }
        let create = await profile.save();
        if (create) {
            return res.status(200).send({
                message : "User created successfully.",
                user : {
                    id : profile._id ,
                    fullName: profile.fullName,
                    email : profile.email ,
                    username : profile.username ,
                    avatar : `http://localhost:3000/avatar/${profile.avatar}`
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
}

export const googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;
        client.verifyIdToken({ idToken: tokenId, audience: GOOGLE_CLIENT_ID }).then(
            async response => {
                const { email_verified, name, email, picture } = response.payload;
                if (email_verified) {
                    const user = await Profile.findOne({ email: email });
                    if (user) {
                        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
                        return res.status(200).json({
                            message: "User logged in successfully.",
                            profile: {
                                _id: user._id,
                                fullName: user.fullName,
                                username: user.username,
                                email: user.email,
                                avatar: user.avatar
                            },
                            token: token
                        });
                    } else {
                        let hashPassword = await bcrypt.hash(email.split('@')[0] + JWT_SECRET, 10);
                        const newUser = new Profile({
                            email,
                            fullName: name,
                            username: email.split('@')[0],
                            password: hashPassword,
                        });
                        await newUser.save();
                        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
                        return res.status(200).json({
                            message: "User logged in successfully.",
                            profile: {
                                _id: newUser._id,
                                fullName: newUser.fullName,
                                username: newUser.username,
                                email: newUser.email
                            },
                            token: token
                        });
                    }
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
