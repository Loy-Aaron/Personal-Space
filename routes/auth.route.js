import { Router } from "express";
import { getUser, login, logout, signUp } from "../controllers/auth.controller.js";
import { userValidator } from '../middlewares/validator.middleware.js';
import authenticate from '../middlewares/auth.middleware.js';

const authRoutes = Router();

authRoutes.post('/signup', userValidator, signUp);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.get('/', authenticate, getUser)
// authRoutes.put('/', authenticate, userValidator, updateUser);
// authRoutes.delete('/', authenticate, deleteUser);

export default authRoutes;