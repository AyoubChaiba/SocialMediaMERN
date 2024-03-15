import express from 'express' ;
import { auth } from '../middleware/auth.js';
import { getTags, getTag } from '../controllers/tags.js';


const tagsRoutes = express.Router();

tagsRoutes.get('/', getTags);
tagsRoutes.get('/:id', getTag);


export default tagsRoutes;