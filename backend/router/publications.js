import express from 'express';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/upload.js' ;
import { getPublications , getPublication , CreatePublication , deletePublication , editPublication, likePublication } from '../controllers/publication.js';


const publicationRoutes = express.Router();


publicationRoutes.get('/', auth, getPublications)
publicationRoutes.get('/:id', auth, getPublication)
publicationRoutes.post('/', auth, upload.single('image'), CreatePublication)
publicationRoutes.put('/:id', auth, upload.single('image'), editPublication)
publicationRoutes.delete('/:id', auth, deletePublication)
publicationRoutes.post('/likes', auth, likePublication)


export default publicationRoutes ;