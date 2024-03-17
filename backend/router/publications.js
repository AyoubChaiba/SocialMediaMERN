import express from 'express';
import { auth , checkAuthorized } from '../middleware/auth.js';
import { imageUpload } from '../middleware/upload.js' ;
import {
    getPublications,
    getPublication,
    CreatePublication,
    deletePublication,
    editPublication,
    likePublication
} from '../controllers/publication.js';

const publicationRoutes = express.Router();

publicationRoutes.get('/', auth, getPublications)
publicationRoutes.get('/:id', getPublication)
publicationRoutes.post('/', auth, imageUpload.single('image'), CreatePublication)
publicationRoutes.put('/:id', auth, imageUpload.single('image'), editPublication)
publicationRoutes.delete('/:id', auth, imageUpload.single('image'), deletePublication)
publicationRoutes.post('/likes', auth, likePublication)

export default publicationRoutes ;