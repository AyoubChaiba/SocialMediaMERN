import express from 'express' ;
import { tags } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';

const authRoutes = express.Router();

authRoutes.get('/tags', auth, tags);
authRoutes.get('/tags/:id', auth, tags);


export default authRoutes;