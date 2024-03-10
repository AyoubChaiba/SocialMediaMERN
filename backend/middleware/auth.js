import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

let { JWT_SECRET } = process.env;

export const auth = (req, res , next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodedToken = jwt.verify(token, JWT_SECRET);
        req.profile = decodedToken;
        next();
    } catch (err) {
        res.status(401).json({
            message : "Invalid",
            error : err.message ,
        });
    }
}

export const checkAuthorized = (req, res, next) => {
    if (req.profile.userId === req.query.userID) {
        next();
    } else {
        res.status(403).json({
            message: "Forbidden",
            error: "User is not authorized to access this resource.",
        });
    }
};