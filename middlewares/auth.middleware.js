import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.js';
import User from '../models/user.model.js';

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
    
        if (!token) return res.status(401).json({ message: 'No token found' });
    
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.uid).select('-password');
    
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') return res.status(401).json({message: 'Expired token'});
        
        if (error.name === 'JsonWebTokenError') return res.status(401).json({message: 'Invalid token'});

        console.error('Error in authenticating', error);
        res.status(500).json({message: 'Internal server error'})
    }
};

export default authenticate;