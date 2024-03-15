import express from 'express';
import { auth } from '../middleware/auth.js';
import { search } from './../controllers/search.js';

const searchRoutes = express.Router();

searchRoutes.get('/',auth, search)

export default searchRoutes ;