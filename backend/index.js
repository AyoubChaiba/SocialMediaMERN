import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

// router
import profileRoute from './router/profile.js';
import publicationRoute from './router/publication.js';

process.noDeprecation = true;

dotenv.config();

let app = express();

app.use(express.json());
app.use(cors());

app.use('/images' , express.static('uploads/images'));
app.use('/profile' , profileRoute);
app.use('/publication', publicationRoute);

let { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => console.error('Error connecting to MongoDB', err));



