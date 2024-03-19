import express from 'express' ;
import { Login, Register, User, updatePassword, googleLogin } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';

const authRoutes = express.Router();

authRoutes.post('/login', Login)
authRoutes.post('/register', Register)
authRoutes.post('/google-login', googleLogin)
authRoutes.put('/', auth, updatePassword)
authRoutes.get('/user', auth, User)


export default authRoutes;