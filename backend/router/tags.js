import express from 'express' ;
import { auth } from '../middleware/auth.js';
import { getTags, getTag, getPopularTags } from '../controllers/tags.js';


const tagsRoutes = express.Router();

tagsRoutes.get('/', auth, getTags);
tagsRoutes.get('/:id', auth, getTag);
tagsRoutes.get('/popular/post', auth, getPopularTags);


export default tagsRoutes;