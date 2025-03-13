import jwt from 'jsonwebtoken';
import {JWT_SECRET, NODE_ENV} from '../config/dotenv.js';

const generateToken = (uid, res) =>{
    const token = jwt.sign({uid}, JWT_SECRET,{expiresIn: '7d'});

    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript access
        secure: NODE_ENV === 'production',
        sameSite: "Strict", // Helps prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

export default generateToken;