import express from 'express' ;
import { auth } from '../middleware/auth.js';
import { getTags, getTag, getPopularTags } from '../controllers/tags.js';


const tagsRoutes = express.Router();

tagsRoutes.get('/', getTags);
tagsRoutes.get('/:id', getTag);
tagsRoutes.get('/popular/post', getPopularTags);


export default tagsRoutes;