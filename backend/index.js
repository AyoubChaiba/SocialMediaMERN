import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './router/auth.js';
import usersRoutes from './router/users.js';
import publicationRoutes from './router/publications.js';
import searchRoutes from "./router/search.js";
import tagsRoutes from "./router/tags.js";

dotenv.config();

const app = express();
const { PORT, MONGODB_URI} = process.env;

app.use(express.json());
app.use(cors());

app.use('/image', express.static('uploads/image'));
app.use('/avatar', express.static('uploads/avatar'));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/tags', tagsRoutes);

mongoose.connect(MONGODB_URI, {}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => console.error('Error connecting to MongoDB', err));


