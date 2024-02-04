import express from 'express' ;
import { Login , Register , User } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';

const authRoutes = express.Router();

authRoutes.post('/login', Login)
authRoutes.post('/register', Register)
authRoutes.get('/user', auth , User)

export default authRoutes;