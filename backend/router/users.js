import express from 'express' ;
import { auth } from '../middleware/auth.js';
import { getUser, uodateUser, favoritePost, getFavorite } from '../controllers/users.js';
import upload from '../middleware/upload.js';


const usersRoutes = express.Router();

// usersRoutes.get('/', auth , getUser );
usersRoutes.get('/:username', auth , getUser );
usersRoutes.put('/:id', auth , upload.single('avatar') , uodateUser );
usersRoutes.post('/:username/save', auth, favoritePost)
usersRoutes.get('/:username/save', auth, getFavorite)

export default usersRoutes