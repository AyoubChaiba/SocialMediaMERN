import express from 'express';
import { auth , checkAuthorized } from '../middleware/auth.js';
import upload from '../middleware/upload.js' ;
import {
    getPublications,
    getPublication,
    CreatePublication,
    deletePublication,
    editPublication,
    likePublication,
} from '../controllers/publication.js';

const publicationRoutes = express.Router();

publicationRoutes.get('/', auth, getPublications)
publicationRoutes.get('/:id', auth, getPublication)
publicationRoutes.post('/', auth, checkAuthorized, upload.single('image'), CreatePublication)
publicationRoutes.put('/:id', auth , checkAuthorized , upload.single('image'), editPublication)
publicationRoutes.delete('/:id', auth, checkAuthorized, deletePublication)
publicationRoutes.post('/likes', auth, checkAuthorized, likePublication)


export default publicationRoutes ;