import express from 'express';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/upload.js' ;
import { getPublications , getPublication , CreatePublication , deletePublication , editPublication } from '../controllers/publication.js';


let publicationsRoute = express.Router();


publicationsRoute.get('/', auth, getPublications)
publicationsRoute.get('/:id', auth, getPublication)
publicationsRoute.post('/', auth, CreatePublication)
publicationsRoute.put('/:id', auth, upload.single('image') , editPublication)
publicationsRoute.delete('/:id', auth, deletePublication)


export default publicationsRoute ;