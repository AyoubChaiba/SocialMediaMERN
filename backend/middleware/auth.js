import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

let {JWT_SECRET} = process.env;

export let auth = (req, res , next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodedToken = jwt.verify(token, JWT_SECRET);
        req.profile = decodedToken;
        console.error("verifying token");
        next();
    } catch (err) {
        console.error("Error verifying"  , err);
        res.status(401).json({
            message : "Invalid",
            error : err.message ,
        });
    }
}